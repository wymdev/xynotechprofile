"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["#about", "About"],
  ["#services", "Services"],
  ["#portfolio", "Work"],
  ["#process", "Process"],
  ["#team", "Team"],
  ["#faq", "FAQ"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header id="navbar" className="nav">
      <div className="container nav-inner">
        <a href="#home" className="brand" aria-label="XynoTech home">
          <span className="brand-mark">XT</span>
          <span className="brand-word">
            XYNO<span>TECH</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary btn-sm nav-cta magnetic">
          <span>Start a project</span>
          <i className="fas fa-arrow-right" />
        </a>

        <button
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
        <a href="#contact" className="btn btn-primary">
          Start a project <i className="fas fa-arrow-right" />
        </a>
      </div>
    </header>
  );
}
