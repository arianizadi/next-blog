"use client";

import { useState } from "react";
import { channelGroups, channelList } from "./data";
import { Figure } from "./Figure";

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

/*
 * The WORK mode: a project browser that is also a manual carousel.
 * Left: channel list (direct selection). Center: inspection surface with
 * previous/next controls and ArrowLeft/ArrowRight support. Right: spec pane.
 * On handsets the three columns recompose into chips + one scrolling surface.
 */
export function ProjectBrowser() {
  const [index, setIndex] = useState(0);
  const total = channelList.length;
  const channel = channelList[index];
  const project = channel.project;

  const step = (delta: number) =>
    setIndex((current) => (current + delta + total) % total);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  return (
    <div
      id="work"
      className="wb-browser"
      role="group"
      aria-roledescription="carousel"
      aria-label={`Project browser, ${total} projects. Use left and right arrow keys to change project.`}
      onKeyDown={onKeyDown}
    >
      <nav className="wb-channels" aria-label="Project channels">
        <div className="wb-channels-head">
          <span className="wb-eyebrow">/ Channels</span>
          <span className="wb-pos">{total}</span>
        </div>
        <div className="wb-channels-list wb-scroll" data-lenis-prevent="">
          {channelGroups.map((group) => (
            <div key={group.label} className="wb-channel-group">
              <span className="wb-eyebrow">/ {group.label}</span>
              {group.channels.map((entry) => {
                const flatIndex = channelList.indexOf(entry);
                const selected = flatIndex === index;
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    className="wb-channel"
                    aria-current={selected ? "true" : undefined}
                    aria-label={`${entry.project.title}, project ${
                      flatIndex + 1
                    } of ${total}`}
                    onClick={() => setIndex(flatIndex)}
                  >
                    <span className="wb-channel-idx" aria-hidden>
                      {pad(flatIndex + 1)}
                    </span>
                    <span className="wb-channel-name">{entry.slug}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      <section className="wb-surface" aria-label="Project inspector">
        <div className="wb-surface-head">
          <button
            type="button"
            className="wb-step"
            onClick={() => step(-1)}
            aria-label="Previous project"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            className="wb-step"
            onClick={() => step(1)}
            aria-label="Next project"
          >
            <span aria-hidden>→</span>
          </button>
          <p className="wb-pos" aria-live="polite">
            <strong>{pad(index + 1)}</strong> / {pad(total)} —{" "}
            {project.title}
          </p>
        </div>

        <div
          key={project.id}
          className="wb-surface-body wb-scroll"
          data-lenis-prevent=""
          tabIndex={0}
          aria-label={`Details for ${project.title}`}
        >
          <p className="wb-project-eyebrow">{project.eyebrow}</p>
          <h3 className="wb-project-title">{project.title}</h3>
          <dl>
            <div className="wb-field">
              <dt>Problem</dt>
              <dd>{project.problem}</dd>
            </div>
            <div className="wb-field">
              <dt>Built</dt>
              <dd>{project.contribution}</dd>
            </div>
            <div className="wb-field">
              <dt>Result</dt>
              <dd>{project.impact}</dd>
            </div>
          </dl>
          <div className="wb-links">
            {project.githubUrl && (
              <a
                className="wb-btn wb-btn--accent"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source <span aria-hidden>↗</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                className="wb-btn"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <aside
        className="wb-notes wb-scroll"
        data-lenis-prevent=""
        tabIndex={0}
        aria-label="Engineering notes"
      >
        <div className="wb-fig">
          <div className="wb-fig-caption">
            <span>[ FIG. {pad(project.id)} ]</span>
            <span aria-hidden>⊞</span>
          </div>
          <Figure seed={project.id} />
        </div>
        <dl className="wb-spec">
          <div>
            <dt>Channel</dt>
            <dd>~/{channel.slug}</dd>
          </div>
          <div>
            <dt>Domain</dt>
            <dd>{project.eyebrow}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>
              <span className="wb-chips">
                {project.technologies.map((tech) => (
                  <span key={tech} className="wb-chip">
                    {tech}
                  </span>
                ))}
              </span>
            </dd>
          </div>
          <div>
            <dt>Index</dt>
            <dd>
              Entry {pad(index + 1)} of {pad(total)}
              {project.featured ? " · flagged featured" : ""}
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
