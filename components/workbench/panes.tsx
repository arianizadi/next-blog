import Link from "next/link";
import { siteConfig } from "@/app/config/site";
import {
  certifications,
  contributions,
  education,
  experiences,
  techGroups,
} from "@/lib/portfolio";
import { Figure } from "./Figure";

const EMAIL = "izadi2000@gmail.com";

/* -------------------------------------------------------- LOG (experience) */

export function LogPane() {
  return (
    <div className="wb-feed">
      <div className="wb-feed-section">
        <span className="wb-eyebrow">/ Employment log</span>
      </div>
      {experiences.map((job) => (
        <article key={`${job.company}-${job.dates}`} className="wb-entry">
          <p className="wb-entry-date">{job.dates}</p>
          <div>
            <h3 className="wb-entry-title">
              {job.role} <span aria-hidden>·</span>{" "}
              <span className="wb-entry-org">{job.company}</span>
            </h3>
            {job.location && <p className="wb-entry-sub">{job.location}</p>}
            <p className="wb-entry-body">{job.summary}</p>
            <ul>
              {job.bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="wb-chips">
              {job.technologies.map((tech) => (
                <span key={tech} className="wb-chip wb-chip--soft">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}

      <div className="wb-feed-section">
        <span className="wb-eyebrow">/ Upstream contributions</span>
      </div>
      {contributions.map((contribution) => (
        <article key={contribution.id} className="wb-entry">
          <p className="wb-entry-date">
            <span
              className={`wb-status-chip ${
                contribution.status === "merged"
                  ? "wb-status-chip--merged"
                  : "wb-status-chip--forked"
              }`}
            >
              {contribution.status}
            </span>
          </p>
          <div>
            <h3 className="wb-entry-title">
              {contribution.feature}{" "}
              <span aria-hidden>·</span>{" "}
              <span className="wb-entry-org">{contribution.project}</span>
            </h3>
            <p className="wb-entry-body">{contribution.description}</p>
            <div className="wb-chips">
              <a
                className="wb-btn"
                href={contribution.prUrl ?? contribution.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contribution.prUrl ? "View PR" : "View repo"}{" "}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------- STACK (skills) */

export function StackPane() {
  return (
    <div className="wb-stack">
      <span className="wb-eyebrow">/ Systems &amp; capabilities</span>
      <div className="wb-stack-grid">
        {techGroups.map((group) => (
          <section key={group.id} className="wb-stack-card">
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="wb-chips">
              {group.skills.map((skill) => (
                <span key={skill} className="wb-chip">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
        <section className="wb-stack-card">
          <h3>Certifications</h3>
          <p>Formal credentials on file.</p>
          <div className="wb-chips">
            {certifications.map((cert) => (
              <span key={cert} className="wb-chip wb-chip--accent">
                {cert}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- EDU (degrees) */

export function EduPane() {
  return (
    <div className="wb-edu">
      <span className="wb-eyebrow">/ Education record</span>
      {education.map((degree) => (
        <article key={degree.degree} className="wb-entry">
          <p className="wb-entry-date">
            {degree.date ?? "In progress"}
            {degree.gpa ? ` · ${degree.gpa}` : ""}
          </p>
          <div>
            <h3 className="wb-entry-title">
              {degree.degree}{" "}
              <span aria-hidden>·</span>{" "}
              <span className="wb-entry-org">{degree.university}</span>
            </h3>
            <ul>
              {degree.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

/* -------------------------------------------------------- WRITE (writing) */

export function WritePane() {
  return (
    <div className="wb-write">
      <span className="wb-eyebrow wb-write-full">/ Output devices</span>
      <Link href="/blog" className="wb-write-tile">
        <h3>
          <span aria-hidden>/</span>blog
        </h3>
        <p>
          Long-form technical writing — systems projects, experiments, and
          engineering notes.
        </p>
        <span className="wb-write-cta">Open blog ↗</span>
      </Link>
      <Link href="/journey" className="wb-write-tile">
        <h3>
          <span aria-hidden>/</span>journey
        </h3>
        <p>The path so far, laid out as a timeline of roles and milestones.</p>
        <span className="wb-write-cta">Open journey ↗</span>
      </Link>
      <a
        href={siteConfig.links.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="wb-write-tile"
      >
        <h3>
          <span aria-hidden>/</span>resume
        </h3>
        <p>The one-page PDF version of this application.</p>
        <span className="wb-write-cta">Open resume ↗</span>
      </a>
    </div>
  );
}

/* ------------------------------------------------------------- CONTACT */

export function ContactPane() {
  return (
    <div className="wb-contact">
      <span className="wb-eyebrow">/ Open a channel</span>
      <div>
        <a href={`mailto:${EMAIL}`} className="wb-contact-mail">
          {EMAIL} <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="wb-contact-grid">
        <div>
          <h3>Location</h3>
          <p>Las Vegas, NV</p>
        </div>
        <div>
          <h3>Elsewhere</h3>
          <ul>
            <li>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.x}
                target="_blank"
                rel="noopener noreferrer"
              >
                X ↗
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.gitroll}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitRoll ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Documents</h3>
          <ul>
            <li>
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume (PDF) ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Signal check</h3>
          <div className="wb-fig">
            <div className="wb-fig-caption">
              <span>[ FIG. TX ]</span>
              <span aria-hidden>⌁</span>
            </div>
            <Figure seed={7} />
          </div>
        </div>
      </div>
    </div>
  );
}
