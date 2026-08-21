"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/app/config/site";
import { Icons } from "@/components/Icons";
import { techGroups } from "@/lib/portfolio";
import { modes, modeForHash, type ModeId } from "./data";
import { PixelGlyph } from "./Figure";
import { ProjectBrowser } from "./ProjectBrowser";
import {
  ContactPane,
  EduPane,
  LogPane,
  StackPane,
  WritePane,
} from "./panes";

const SIGNAL = ["C/C++", "Linux", "Real-Time", "Robotics", "Low-Level"];

const RAIL_LINKS = [
  { label: "GitHub", href: siteConfig.links.github, icon: Icons.Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Icons.Linkedin },
  { label: "X", href: siteConfig.links.x, icon: Icons.X },
  { label: "GitRoll", href: siteConfig.links.gitroll, icon: Icons.GitRoll },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6M9 13h7M9 17h7" />
    </svg>
  );
}

export function Workbench() {
  const [mode, setMode] = useState<ModeId>("work");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const tabRefs = useRef(new Map<ModeId, HTMLButtonElement>());

  // Deep links from other pages (and the /projects redirect) arrive as
  // /#work, /#experience, /#skills, /#contact — map them to modes.
  useEffect(() => {
    const apply = () => {
      const target = modeForHash(window.location.hash);
      if (target) setMode(target);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const select = (id: ModeId) => {
    setMode(id);
    const hash = modes.find((m) => m.id === id)?.hash;
    if (hash) history.replaceState(null, "", hash);
  };

  const onTablistKeyDown = (event: React.KeyboardEvent) => {
    const order = modes.map((m) => m.id);
    const current = order.indexOf(mode);
    let target: number | null = null;
    if (event.key === "ArrowRight") target = (current + 1) % order.length;
    else if (event.key === "ArrowLeft")
      target = (current - 1 + order.length) % order.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = order.length - 1;
    if (target === null) return;
    event.preventDefault();
    const id = order[target];
    select(id);
    tabRefs.current.get(id)?.focus();
  };

  const activeMode = modes.find((m) => m.id === mode) ?? modes[0];

  return (
    <div className="wb-desk">
      <div className="wb-wallpaper" aria-hidden>
        <div className="wb-stars" />
      </div>

      <div className="wb-window">
        <a className="wb-skip" href="#wb-panel">
          Skip to workspace
        </a>

        <div className="wb-titlebar">
          <span className="wb-glyph" aria-hidden>
            <PixelGlyph />
          </span>
          <span className="wb-appname">ARIAN.SYSTEMS</span>
          <span className="wb-titlebar-note">
            — embedded / systems workbench
          </span>
          <span className="wb-titlebar-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </div>

        <header className="wb-status">
          <div>
            <h1 className="wb-name">
              Arian Izadi<span className="wb-name-dot">.</span>
            </h1>
            <p className="wb-rolebar">
              <span className="wb-led" aria-hidden />
              <strong>Embedded Software Engineer II</strong>
              <span aria-hidden>@</span>
              <span>Konami Gaming, Inc.</span>
              <span aria-hidden>·</span>
              <span>Las Vegas, NV</span>
            </p>
            <ul className="wb-signal" aria-label="Core focus">
              {SIGNAL.map((item) => (
                <li key={item} className="wb-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <span className="wb-cross" style={{ right: "34%", top: "14px" }} aria-hidden>
            +
          </span>
          <span className="wb-cross" style={{ right: "14%", bottom: "12px" }} aria-hidden>
            +
          </span>
          <div className="wb-badge" aria-hidden>
            <PixelGlyph size={30} />
          </div>
        </header>

        <div
          className="wb-tabs"
          role="tablist"
          aria-label="Application modes"
          onKeyDown={onTablistKeyDown}
        >
          {modes.map((m) => (
            <button
              key={m.id}
              ref={(el) => {
                if (el) tabRefs.current.set(m.id, el);
                else tabRefs.current.delete(m.id);
              }}
              type="button"
              role="tab"
              id={`wb-tab-${m.id}`}
              aria-selected={mode === m.id}
              aria-controls="wb-panel"
              aria-label={m.fullLabel}
              tabIndex={mode === m.id ? 0 : -1}
              className="wb-tab"
              onClick={() => select(m.id)}
            >
              <span className="wb-tab-key" aria-hidden>
                [{m.key}]
              </span>
              {m.label}
            </button>
          ))}
          <span className="wb-tabs-meta">
            MODE: {activeMode.fullLabel.toUpperCase()}
          </span>
        </div>

        <div className="wb-workspace">
          <nav className="wb-rail" aria-label="External links">
            {RAIL_LINKS.map((link) => (
              <a
                key={link.label}
                className="wb-rail-btn"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <span aria-hidden style={{ display: "inline-flex" }}>
                  <link.icon fill="currentColor" />
                </span>
              </a>
            ))}
            <a
              className="wb-rail-btn"
              href="mailto:izadi2000@gmail.com"
              aria-label="Email"
            >
              <span aria-hidden style={{ display: "inline-flex" }}>
                <MailIcon />
              </span>
            </a>
            <a
              className="wb-rail-btn"
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (PDF)"
            >
              <span aria-hidden style={{ display: "inline-flex" }}>
                <DocIcon />
              </span>
            </a>
            <span className="wb-rail-spacer" />
            <span className="wb-rail-rec" aria-hidden />
          </nav>

          <div className="wb-panel">
            <div
              id="wb-panel"
              role="tabpanel"
              aria-labelledby={`wb-tab-${mode}`}
              tabIndex={-1}
              className={mode === "work" ? "wb-pane" : "wb-pane wb-scroll"}
              data-lenis-prevent=""
            >
              {mode === "work" && <ProjectBrowser />}
              {mode === "log" && <LogPane />}
              {mode === "stack" && <StackPane />}
              {mode === "edu" && <EduPane />}
              {mode === "write" && <WritePane />}
              {mode === "contact" && <ContactPane />}
            </div>
          </div>
        </div>

        <div className="wb-console">
          <div className="wb-console-bar">
            <span className="wb-console-ok">
              <span className="wb-led" aria-hidden />
              SYS OK
            </span>
            <span aria-hidden>C/C++ · LINUX · REAL-TIME · ROBOTICS</span>
            <button
              type="button"
              className="wb-console-toggle"
              aria-expanded={drawerOpen}
              aria-controls="wb-drawer"
              onClick={() => setDrawerOpen((open) => !open)}
            >
              Capabilities {drawerOpen ? "▾" : "▴"}
            </button>
          </div>
          {drawerOpen && (
            <div id="wb-drawer" className="wb-drawer">
              {techGroups.map((group) => (
                <p key={group.id} className="wb-drawer-line">
                  <span className="wb-drawer-key">[{group.id}]</span>
                  <span>{group.skills.join(" · ")}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        <nav className="wb-tabbar" aria-label="Application modes">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              className="wb-tab"
              aria-label={m.fullLabel}
              aria-current={mode === m.id ? "true" : undefined}
              onClick={() => select(m.id)}
            >
              <span className="wb-tab-key" aria-hidden>
                [{m.key}]
              </span>
              {m.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
