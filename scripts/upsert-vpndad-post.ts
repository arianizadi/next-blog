import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const title = "Building VpnDad: An iOS Packet Tunnel for MasterDnsVPN";
const description =
  "A networking deep dive into turning MasterDnsVPN into an iOS Packet Tunnel app, from route setup and SOCKS bridging to DNS transport, MTU limits, ARQ, and optional FEC.";
const date = new Date("2026-06-02T12:00:00.000Z");
const tags = ["networking", "ios", "vpn", "masterdnsvpn", "dns-tunneling"];

const content = `
When my dad in Iran was affected by a connectivity blackout, the project stopped feeling like an experiment. It became a very specific systems problem: how do I take a DNS-tunneled proxy tool that works for engineers and turn it into something a family member can actually use from an iPhone?

MasterDnsVPN already had the interesting part: it can move tunneled traffic through DNS resolver paths, negotiate a session with a server, and survive unreliable transport better than a simple request/response proxy. What it did not have was a native iOS client experience. There was no App Store-style button, no Network Extension wrapper, no diagnostics screen, no profile import flow, and no clean way to explain what failed when the network path was hostile.

That became VpnDad.

This post is a technical deep dive into the networking stack behind it: how the iOS Packet Tunnel is wired, why the app uses a local SOCKS bridge, how MasterDnsVPN fits into the data path, what MTU testing is doing, and why reliability features like ARQ and optional FEC matter when DNS is the carrier.

## The Shape Of The Problem

On iOS, a normal app cannot just grab every packet and send it through a custom transport. Apple gives you that capability through Network Extension, specifically NEPacketTunnelProvider. The extension gets a virtual packet interface, receives IP packets from the system, and is responsible for writing packets back.

That creates the first design decision: VpnDad is not just a settings screen around a command-line tool. It is a small networking stack:

~~~text
iOS apps
  -> NEPacketTunnelFlow
  -> packet-flow bridge
  -> hev-socks5-tunnel
  -> local SOCKS5 listener
  -> MasterDnsVPN mobile bridge
  -> UDP DNS resolver
  -> MasterDnsVPN server
  -> internet
~~~

Each layer has a job. The Packet Tunnel owns the system route. The packet-flow bridge moves IP packets into a userspace TCP/UDP stack. The SOCKS layer gives MasterDnsVPN a proxy-shaped interface. The Go mobile bridge starts the MasterDnsVPN engine and exposes status back to Swift.

The result is a native iOS VPN interface over a transport that was originally designed around DNS tunneling.

## Why MasterDnsVPN Is Interesting

MasterDnsVPN is cool because it treats DNS as a constrained transport instead of a normal socket. That means you do not get a clean TCP stream with a friendly MTU and predictable loss behavior. You get small queries and responses, resolver behavior you do not fully control, payload encoding, server-side session state, and a lot of places where packets can be delayed, clipped, duplicated, or dropped.

That sounds painful, but it is also exactly why the project is interesting. A useful DNS tunnel has to answer questions that normal web apps never touch:

- How small should each upload chunk be so resolvers accept it?
- How large can the server response be before the path starts dropping it?
- How do you keep stream order when DNS responses arrive late?
- How do you tell the app whether a tunnel is actually usable or merely "connected" according to iOS?
- How do you recover from packet loss without exploding overhead?

Those are real networking problems, not just UI problems.

## The iOS Route Setup

The Packet Tunnel starts by installing routes and DNS settings. The tunnel claims default IPv4 and IPv6 routes, but it excludes the resolver IPs so the DNS tunnel can still reach the outside server instead of recursively routing its own carrier packets back through the tunnel.

This is the kind of setup VpnDad uses in the extension:

~~~swift
private func applyNetworkSettings(for profile: VPNProfile) async throws {
    let settings = NEPacketTunnelNetworkSettings(
        tunnelRemoteAddress: "198.18.0.254"
    )

    let ipv4 = NEIPv4Settings(
        addresses: [AppConstants.tunnelIPv4Address],
        subnetMasks: ["255.255.255.0"]
    )
    ipv4.includedRoutes = [NEIPv4Route.default()]
    ipv4.excludedRoutes = excludedIPv4Routes(for: profile)
    settings.ipv4Settings = ipv4

    let dns = NEDNSSettings(servers: [AppConstants.fakeDNSAddress])
    dns.matchDomains = [""]
    settings.dnsSettings = dns
    settings.mtu = 1280

    try await setTunnelNetworkSettingsAsync(settings)
}
~~~

The excluded resolver route is important. If the profile says the resolver is 203.0.113.10:53, iOS should route normal app traffic into the tunnel, but the tunnel process itself must still be able to send UDP packets to 203.0.113.10. If you forget that, the tunnel can eat its own transport.

## Bridging Packet Flow To SOCKS

MasterDnsVPN is easier to integrate as a SOCKS-style client than as a raw packet engine. VpnDad uses hev-socks5-tunnel as the adapter between iOS packet flow and the local SOCKS listener.

The extension creates a socketpair. One side is passed to hev-socks5-tunnel. The other side is pumped from NEPacketTunnelFlow:

~~~swift
private func makePacketFlowBridge() throws -> (
    hevFileDescriptor: Int32,
    packetFlowFileDescriptor: Int32
) {
    var fileDescriptors = [Int32](repeating: -1, count: 2)
    let result = socketpair(AF_UNIX, SOCK_DGRAM, 0, &fileDescriptors)
    guard result == 0 else {
        throw TunnelRuntimeError.hevIntegrationNotConfigured("socketpair failed")
    }
    return (fileDescriptors[0], fileDescriptors[1])
}
~~~

That lets the iOS extension stay focused on packets while the Go engine stays focused on SOCKS streams and DNS tunnel transport.

The generated hev config points at the local SOCKS listener:

~~~yaml
tunnel:
  mtu: 1280
  multi-queue: false
socks5:
  address: 127.0.0.1
  port: 18080
  udp: tcp
mapdns:
  address: 100.64.0.1
  port: 53
~~~

So when Safari, Messages, or a health-check URL opens a connection, iOS sends packets to the tunnel, hev translates them into SOCKS requests, and MasterDnsVPN gets a stream it knows how to carry.

## The Go Mobile Bridge

The app embeds MasterDnsVPN through gomobile. Swift does not need to know every internal detail of the Go runtime. It starts the engine with a JSON profile and polls status as JSON:

~~~swift
final class EngineRuntime {
    func start(
        profileJSON: String,
        socksAddress: String,
        log: @escaping (String) -> Void
    ) throws {
        let sink = EngineBridgeLogSink(log: log)
        MobilebridgeStartEngine(profileJSON, socksAddress, sink, nil)
    }

    func statusJSON() -> String {
        MobilebridgeEngineStatus()
    }
}
~~~

This boundary matters. The iOS app can be opinionated about user experience, profile storage, diagnostics, and VPN lifecycle while the Go side owns DNS transport, session negotiation, stream framing, and reliability.

## Profiles As The Contract

Profiles are the contract between the app and the tunnel engine. A basic MasterDnsVPN profile says which domain to use, which resolver to send packets to, what exit IP is expected, and which optional reliability settings the client wants.

~~~json
{
  "version": 1,
  "name": "Family MasterDnsVPN",
  "protocol": "masterdns",
  "domain": "m.vpn.example",
  "resolvers": [
    {
      "type": "udp",
      "address": "203.0.113.10:53"
    }
  ],
  "expectedExitIP": "203.0.113.10",
  "masterdns": {
    "encryptionLevel": "maximum",
    "fecLevel": "conservative",
    "fecDirection": "download"
  }
}
~~~

The app normalizes friendly presets into the raw engine fields. For FEC, the app exposes levels instead of making a user type group sizes and overhead percentages:

~~~swift
static func fecSettings(forLevel level: String?) -> (
    level: String,
    enabled: Bool,
    groupSize: Int,
    overheadPercent: Int,
    symbolSize: Int,
    flushTimeoutMs: Int
)? {
    switch normalizedFECLevel(level) {
    case "none":
        return ("none", false, 8, 15, 0, 25)
    case "conservative":
        return ("conservative", true, 8, 15, 0, 25)
    case "balanced":
        return ("balanced", true, 12, 25, 0, 20)
    case "aggressive":
        return ("aggressive", true, 16, 40, 0, 15)
    default:
        return nil
    }
}
~~~

That gives the UI a simple shape while keeping the transport tunable.

## Handshake Is Not The Same As Connected

iOS can report that a VPN is connected after the Packet Tunnel starts. That does not mean the MasterDnsVPN session is alive. For this project, I needed the app to distinguish "the extension started" from "the DNS tunnel negotiated a session and accepted a resolver."

So the extension waits for MasterDnsVPN-specific evidence:

~~~swift
private func waitForMasterDNSHandshake() async throws {
    let deadline = Date().addingTimeInterval(25)

    while Date() < deadline {
        let metrics = writeTelemetrySnapshot(forceLog: false)
        if metrics.sessionID != nil,
           (metrics.acceptedResolvers ?? 0) > 0 {
            log("MasterDnsVPN handshake verified")
            return
        }

        if let failure = masterDNSStartupFailure(in: metrics) {
            throw TunnelRuntimeError.engineHandshakeFailed(failure)
        }

        try await Task.sleep(nanoseconds: 250_000_000)
    }

    throw TunnelRuntimeError.engineHandshakeFailed("session was not initialized")
}
~~~

This is why the diagnostics screen is more useful than the raw iOS status. "Connected" can mean the virtual interface exists. It does not necessarily mean the remote DNS tunnel path is usable. The app needs tunnel-specific metrics.

## MTU Testing Is The First Reliability Layer

DNS tunneling is extremely sensitive to payload size. Upload packets are usually more constrained because query names and encoded payloads have hard practical limits. Download can be larger, but responses can still be clipped or dropped by resolver behavior.

MasterDnsVPN tests resolver-domain pairs before choosing a path:

~~~text
Testing MTU sizes for all resolver-domain pairs...
Accepted: m.vpn.example via 203.0.113.10:53
Upload MTU: 111
Download MTU: 500
Selected synced upload MTU: 111
Selected synced download MTU: 500
~~~

That result tells the engine how aggressively it can pack data into DNS messages. If upload MTU is too low or the resolver times out, the app should not pretend the tunnel is healthy.

This also explains why download performance can feel uneven. In a normal VPN, download packets are carried over a transport designed for bulk data. Here, downstream traffic is carved into DNS response payloads, sequenced, decoded, and reassembled while the client continues to satisfy TCP expectations on the iOS side.

## ARQ And FEC

MasterDnsVPN already has ARQ-style recovery: if data is missing, the receiver can request retransmission and the sender can queue another copy. That is reliable but reactive. You notice loss, signal it, and wait for repair.

FEC is different. With forward error correction, the sender emits extra recovery symbols for a group of packets. If a few packets are lost, the receiver may reconstruct them without waiting for a resend.

For VpnDad, the first useful direction is download-side FEC:

~~~text
server downstream packets
  -> group stream data packets
  -> send original data immediately
  -> send low-priority FEC repair symbols
  -> client reconstructs missing downstream packets
  -> recovered payloads enter the normal receive path
~~~

The important design choice is that FEC does not replace ARQ. It helps reduce visible stalls when it can recover quickly. If it cannot recover the group, ARQ still handles the loss.

The app exposes this as levels:

~~~text
none          no FEC
conservative group=8   overhead=15%
balanced     group=12  overhead=25%
aggressive   group=16  overhead=40%
~~~

That is a better user model than raw packet math. My dad does not need to understand RaptorQ symbols. He needs a profile that either prioritizes lower overhead or more recovery.

## What The Diagnostics Track

The useful metrics are the ones that can separate the layers:

~~~text
engine phase
selected resolver
session id
accepted resolver count
upload and download packet counts
bridge read/write errors
ARQ resend and NACK counters
FEC negotiated status
FEC recovered packet count
public IP and DNS leak checks
~~~

That turns debugging from guesswork into a checklist. If resolver reachability fails, the UDP path is broken. If the session id never appears, the MasterDnsVPN handshake failed. If FEC recovered packets increase but throughput still stalls, the transport is under heavy loss and ARQ may still be carrying too much repair work.

## Why This Was Worth Building

The part I like most about this project is that it crosses layers. It is not only a SwiftUI app, not only a Go bridge, and not only a DNS tunnel. It is a full path from iOS routing policy down to DNS packet constraints and back up into human-readable diagnostics.

For my dad, the goal is simple: open the app, pick a profile, connect. For me, the interesting work is everything behind that button:

- keeping the resolver outside the tunnel route
- translating packet flow into SOCKS streams
- making Go and Swift share a stable profile contract
- proving the MasterDnsVPN session is actually alive
- measuring MTU, retransmits, and FEC recovery
- packaging the app so it can be built and re-signed outside the App Store path

That is why MasterDnsVPN is such a fun base to build on. It forces the client to respect real network constraints. Every byte of overhead matters. Every reconnect tells you something. Every metric is a clue about where the path is failing.

VpnDad started because there was no iOS app for the use case I cared about. It became a deep systems project because making a DNS tunnel feel like a normal mobile VPN means building carefully across the entire stack.
`.trim();

async function main() {
  const existingPost = await prisma.blogPost.findUnique({
    where: { title },
  });

  const post = existingPost
    ? await prisma.blogPost.update({
        where: { title },
        data: {
          description,
          date,
          tags,
          content,
        },
      })
    : await prisma.blogPost.create({
        data: {
          title,
          description,
          date,
          tags,
          content,
        },
      });

  console.log(`Upserted blog post: ${post.title}`);
  console.log(`Post id: ${post.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
