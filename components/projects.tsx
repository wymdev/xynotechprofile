"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { categories, categoryName, projects, type Project } from "../lib/data";
import { projectArt } from "../lib/projectArt";

function Art({ p }: { p: Project }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (p.image) return <img src={p.image} alt={p.title} loading="lazy" />;
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: projectArt(p) }} />;
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [shown, setShown] = useState<string>("all");
  const [phase, setPhase] = useState<"idle" | "leaving" | "entering">("idle");
  const [open, setOpen] = useState<Project | null>(null);
  const [closing, setClosing] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const list = useMemo(() => (shown === "all" ? projects : projects.filter((p) => p.category === shown)), [shown]);

  // Filter transition: old cards scale away, new cards rise in with a 3D flip.
  const choose = (id: string) => {
    if (id === filter) return;
    setFilter(id);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(id);
      return;
    }
    setPhase("leaving");
    setTimeout(() => {
      setShown(id);
      setPhase("entering");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("idle")));
    }, 320);
  };

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(null);
      setClosing(false);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    }, 280);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <div className="filters reveal" role="tablist" aria-label="Filter projects">
        {categories.map((c) => {
          const count = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
          return (
            <button key={c.id} role="tab" className="filter-btn" aria-selected={filter === c.id} onClick={() => choose(c.id)}>
              <i className={`fas ${c.icon}`} /> {c.name} <span className="count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="project-grid">
        {list.map((p, i) => (
          <div key={`${shown}-${p.id}`} className={`project${phase !== "idle" ? ` ${phase}` : ""}`} style={{ transitionDelay: phase === "idle" ? `${i * 60}ms` : "0ms" }}>
            <button
              className="project-card"
              data-tilt="7"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(p);
              }}
              aria-label={`${p.title} — view details`}
            >
              <div className="project-art">
                <Art p={p} />
                {p.featured && <span className="project-featured">Featured</span>}
                <span className="project-year">{p.year}</span>
              </div>
              <div className="project-body">
                <span className="project-cat">{categoryName[p.category]}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-foot">
                  <ul className="tag-row">
                    {p.tags.slice(0, 3).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <span className="project-arrow" aria-hidden="true">
                    <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {open &&
        createPortal(
        <div className={`modal${closing ? " closing" : ""}`}>
          <div className="modal-backdrop" onClick={close} />
          <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button ref={closeBtn} className="modal-close" onClick={close} aria-label="Close project details">
              <i className="fas fa-xmark" />
            </button>
            <div className="modal-art">
              <Art p={open} />
            </div>
            <div className="modal-body">
              <span className="role-pill">{categoryName[open.category]}</span>
              <h2 id="modal-title">{open.title}</h2>
              <div className="modal-meta">
                <span>
                  <i className="fas fa-calendar" /> {open.year}
                </span>
                <span>
                  <i className="fas fa-building" /> {open.client}
                </span>
              </div>
              <p id="modal-description">{open.fullDescription}</p>
              <h3>Technologies</h3>
              <ul className="tag-row">
                {open.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="modal-actions">
                {open.demoUrl && (
                  <a className="btn btn-primary" href={open.demoUrl} target="_blank" rel="noopener">
                    <i className="fas fa-arrow-up-right-from-square" /> Live demo
                  </a>
                )}
                {open.githubUrl && (
                  <a className="btn btn-ghost" href={open.githubUrl} target="_blank" rel="noopener">
                    <i className="fab fa-github" /> View code
                  </a>
                )}
                <a className="btn btn-ghost" href="#contact" onClick={close}>
                  Build something similar <i className="fas fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
