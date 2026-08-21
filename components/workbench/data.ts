import { projects, type Project } from "@/lib/portfolio";

/*
 * Channel layout for the project browser. Groups are ordered systems-first;
 * every entry references a project from lib/portfolio.ts by id.
 */

export interface Channel {
  slug: string;
  project: Project;
}

export interface ChannelGroup {
  label: string;
  channels: Channel[];
}

const GROUP_DEFS: { label: string; entries: [number, string][] }[] = [
  {
    label: "Systems & Embedded",
    entries: [
      [15, "lidar-perception"],
      [16, "udp-heartbeat"],
      [8, "rustos-kernel"],
      [2, "t-rex-timing"],
      [10, "sealcrypt"],
      [3, "room-mapping"],
      [6, "reverse-eng"],
    ],
  },
  {
    label: "Perception & ML",
    entries: [
      [1, "segmentary"],
      [17, "media-suite"],
      [11, "inference-check"],
    ],
  },
  {
    label: "Apps & Tools",
    entries: [
      [13, "vpndad"],
      [12, "cal"],
      [14, "ff-notifier"],
      [9, "knowledge-map"],
      [4, "lazy-wordler"],
      [5, "pass-convert"],
    ],
  },
];

const byId = new Map(projects.map((p) => [p.id, p]));

export const channelGroups: ChannelGroup[] = GROUP_DEFS.map((group) => ({
  label: group.label,
  channels: group.entries.flatMap(([id, slug]) => {
    const project = byId.get(id);
    return project ? [{ slug, project }] : [];
  }),
}));

export const channelList: Channel[] = channelGroups.flatMap(
  (group) => group.channels
);

/* Application modes: every former page section is a mode, not a section. */

export type ModeId = "work" | "log" | "stack" | "edu" | "write" | "contact";

export interface Mode {
  id: ModeId;
  key: string;
  label: string;
  fullLabel: string;
  hash: string;
}

export const modes: Mode[] = [
  { id: "work", key: "1", label: "WORK", fullLabel: "Projects", hash: "#work" },
  { id: "log", key: "2", label: "LOG", fullLabel: "Experience", hash: "#experience" },
  { id: "stack", key: "3", label: "STACK", fullLabel: "Systems & skills", hash: "#skills" },
  { id: "edu", key: "4", label: "EDU", fullLabel: "Education", hash: "#education" },
  { id: "write", key: "5", label: "WRITE", fullLabel: "Writing", hash: "#writing" },
  { id: "contact", key: "6", label: "CONTACT", fullLabel: "Contact", hash: "#contact" },
];

const hashToMode = new Map(modes.map((m) => [m.hash, m.id]));

export function modeForHash(hash: string): ModeId | undefined {
  return hashToMode.get(hash);
}
