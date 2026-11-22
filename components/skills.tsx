"use client";

import { useEffect, useRef, useState } from "react";
import { orbitIcons, skillGroups } from "../lib/data";

/** 3D ring of tech icons. Spins on its own; scrolling speeds it up, dragging with a mouse spins it by hand. */
export function Orbit() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ring.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let angle = 0,
      vel = 0.18,
      raf = 0,
      running = false,
      lastScroll = window.scrollY,
      dragging = false,
      lastX = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const sy = window.scrollY;
      vel += (sy - lastScroll) * 0.004;
      lastScroll = sy;
      if (!dragging) vel += (0.18 - vel) * 0.04;
      angle += vel;
      el.style.setProperty("--spin", `${angle.toFixed(2)}deg`);
    };
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !running) {
        running = true;
        lastScroll = window.scrollY;
        raf = requestAnimationFrame(frame);
      } else if (!en.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    const scene = el.parentElement!;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      lastX = e.clientX;
      scene.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vel = (e.clientX - lastX) * 0.4;
      lastX = e.clientX;
    };
    const up = () => (dragging = false);
    scene.addEventListener("pointerdown", down);
    scene.addEventListener("pointermove", move);
    scene.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      scene.removeEventListener("pointerdown", down);
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div className="orbit-scene reveal" aria-hidden="true">
      <div className="orbit-core">
        <span>XT</span>
      </div>
      <div className="orbit-ring" ref={ring}>
        {orbitIcons.map((icon, i) => (
          <div key={icon} className="orbit-item" style={{ ["--a" as string]: `${(360 / orbitIcons.length) * i}deg` }}>
            <i className={icon} />
          </div>
        ))}
      </div>
      <div className="orbit-floor" />
    </div>
  );
}

export function SkillTabs() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active)!;
  return (
    <>
      <div className="skill-tabs reveal" role="tablist" aria-label="Skill categories">
        {skillGroups.map((g) => (
          <button
            key={g.id}
            role="tab"
            id={`tab-${g.id}`}
            aria-controls="skill-list"
            aria-selected={g.id === active}
            className="filter-btn"
            onClick={() => setActive(g.id)}
          >
            <i className={g.icon} /> {g.name}
          </button>
        ))}
      </div>
      <div className="skill-list" id="skill-list" role="tabpanel" aria-labelledby={`tab-${active}`}>
        {group.skills.map((s, i) => (
          <div key={`${active}-${s.name}`} className="skill" style={{ ["--i" as string]: i }}>
            <div className="skill-top">
              <i className={s.icon} />
              {s.name}
              <b>{s.proficiency}%</b>
            </div>
            <div className="skill-bar">
              <span style={{ ["--p" as string]: `${s.proficiency}%` }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
