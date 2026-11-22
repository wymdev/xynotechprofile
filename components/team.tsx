"use client";

import { useState } from "react";
import { team } from "../lib/data";

export default function Team() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const toggle = (i: number) => setFlipped((f) => (f === i ? null : i));

  return (
    <div className="team-grid">
      {team.map((m, i) => {
        const isFlipped = flipped === i;
        return (
          <div key={m.name} className="member reveal" style={{ ["--d" as string]: i }}>
            <div
              className={`team-card${isFlipped ? " flipped" : ""}`}
              data-tilt="10"
              tabIndex={0}
              role="button"
              aria-pressed={isFlipped}
              aria-label={`${m.name}, ${m.role}. ${isFlipped ? "Showing profile. Press to show photo." : "Press to show profile."}`}
              onClick={(e) => !(e.target as HTMLElement).closest("a") && toggle(i)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <div className="team-inner">
                <div className="team-face team-front" aria-hidden={isFlipped}>
                  <div className="team-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.photo} alt={m.name} loading="lazy" />
                  </div>
                  <div className="team-meta">
                    <span className="role-pill">{m.role}</span>
                    <h3>{m.name}</h3>
                    <span className="flip-hint">
                      <i className="fas fa-arrows-rotate" /> View profile
                    </span>
                  </div>
                </div>
                <div className="team-face team-back" aria-hidden={!isFlipped}>
                  <span className="role-pill">{m.role}</span>
                  <h3>{m.name}</h3>
                  <p>{m.bio}</p>
                  <ul className="tag-row">
                    {m.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="team-social">
                    {m.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener" aria-label={`${m.name} on ${l.label}`} tabIndex={isFlipped ? 0 : -1}>
                        <i className={l.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
