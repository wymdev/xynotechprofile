"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

type SectionInfo = { id: string; label: string };

/**
 * Page-wide motion: preloader, scroll-driven section transitions, light/dark morph,
 * section indicator, nav wipe, reveals, 3D tilt, magnetic buttons, counters.
 */
export default function Effects() {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [active, setActive] = useState(0);
  const [wipeLabel, setWipeLabel] = useState("");
  const wipeRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window | Document | HTMLElement, ev: K | string, fn: (e: any) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn, opts);
      cleanups.push(() => t.removeEventListener(ev, fn, opts));
    };

    if (!reduced) root.classList.add("js-transitions");

    // ---------- preloader ----------
    const preloader = document.getElementById("preloader");
    let readyDone = false;
    const ready = () => {
      if (readyDone) return;
      readyDone = true;
      performance.mark?.("xyno:ready");
      preloader?.classList.add("done");
      body.classList.remove("is-loading");
      requestAnimationFrame(() => body.classList.add("ready"));
      (window as any).__xynoReady = true;
      window.dispatchEvent(new Event("xyno:ready"));
    };
    const minShow = reduced ? 0 : 1100;
    const t0 = performance.now();
    const onLoad = () => setTimeout(ready, Math.max(0, minShow - (performance.now() - t0)));
    if (document.readyState === "complete") onLoad();
    else on(window, "load", onLoad);
    const failSafe = setTimeout(ready, 2600);
    cleanups.push(() => clearTimeout(failSafe));

    // ---------- sections ----------
    const secEls = Array.from(document.querySelectorAll<HTMLElement>("[data-label]"));
    setSections(secEls.map((el) => ({ id: el.id, label: el.dataset.label || el.id })));

    const nav = document.getElementById("navbar");
    const progress = document.getElementById("scroll-progress");
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const timeline = document.getElementById("timeline");
    const timelineFill = document.getElementById("timeline-fill");
    const steps = timeline ? Array.from(timeline.querySelectorAll<HTMLElement>(".step")) : [];
    let lastY = window.scrollY;
    let ticking = false;
    let lastActive = -1;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;

      if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (nav) {
        nav.classList.toggle("scrolled", y > 30);
        const menuOpen = nav.querySelector('[aria-expanded="true"]');
        nav.classList.toggle("hide", !menuOpen && y > lastY && y > vh * 0.8);
      }
      lastY = y;

      let current = 0;
      secEls.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) current = i;
        if (reduced) return;
        if (el.classList.contains("hero")) {
          el.style.setProperty("--out", clamp(-r.top / (r.height * 0.75)).toFixed(3));
          return;
        }
        // Only touch sections near the viewport.
        if (r.bottom < -vh || r.top > vh * 2) return;
        el.style.setProperty("--in", clamp((vh - r.top) / (vh * 0.65)).toFixed(3));
        el.style.setProperty("--out", clamp(1 - r.bottom / (vh * 0.4)).toFixed(3));
      });

      // process timeline: the line fills and each step lights up as you scroll through it
      if (timeline && timelineFill) {
        const r = timeline.getBoundingClientRect();
        const p = reduced ? 1 : clamp((vh * 0.8 - r.top) / (r.height * 0.9));
        timelineFill.style.transform = `scaleX(${p.toFixed(3)})`;
        steps.forEach((s, i) => s.classList.toggle("lit", p >= i / Math.max(1, steps.length - 1) - 0.05));
      }

      if (current !== lastActive) {
        lastActive = current;
        setActive(current);
        const el = secEls[current];
        body.classList.toggle("theme-light", el?.dataset.theme === "light");
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${el?.id}`));
      }
      if (barRef.current) {
        const el = secEls[current];
        if (el) {
          const r = el.getBoundingClientRect();
          barRef.current.style.transform = `scaleX(${clamp((vh * 0.5 - r.top) / r.height)})`;
        }
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    on(window, "scroll", onScroll, { passive: true });
    on(window, "resize", onScroll);
    update();

    // ---------- in-page navigation with a wipe transition ----------
    let wiping = false;
    on(document, "click", (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
      const top = target.getBoundingClientRect().top + window.scrollY - (id === "home" ? 0 : 10);
      const far = Math.abs(top - window.scrollY) > window.innerHeight * 1.5;
      if (reduced || !far || wiping || !wipeRef.current) {
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
        return;
      }
      wiping = true;
      setWipeLabel(target.dataset.label || "");
      const w = wipeRef.current;
      w.classList.remove("out");
      w.classList.add("in");
      setTimeout(() => {
        window.scrollTo({ top, behavior: "auto" });
        setTimeout(() => {
          w.classList.add("out");
          w.classList.remove("in");
          setTimeout(() => {
            w.classList.remove("out");
            wiping = false;
          }, 700);
        }, 260);
      }, 620);
    });

    // ---------- reveal on scroll ----------
    const revealObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            revealObs.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => (reduced ? el.classList.add("in") : revealObs.observe(el)));
    cleanups.push(() => revealObs.disconnect());

    // ---------- counters ----------
    const counterObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          counterObs.unobserve(el);
          const target = Number(el.dataset.target || 0);
          if (reduced) {
            el.textContent = String(target);
            return;
          }
          const start = performance.now();
          const step = (now: number) => {
            const p = clamp((now - start) / 1600);
            el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }),
      { threshold: 0.6 },
    );
    document.querySelectorAll(".counter").forEach((el) => counterObs.observe(el));
    cleanups.push(() => counterObs.disconnect());

    // ---------- pointer effects (desktop only) ----------
    if (finePointer && !reduced) {
      body.classList.add("has-mouse");
      const glow = document.getElementById("cursor-glow");
      let gx = innerWidth / 2,
        gy = innerHeight / 2,
        tx = gx,
        ty = gy,
        raf = 0;
      const glowLoop = () => {
        gx += (tx - gx) * 0.12;
        gy += (ty - gy) * 0.12;
        if (glow) glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
        raf = requestAnimationFrame(glowLoop);
      };
      raf = requestAnimationFrame(glowLoop);
      cleanups.push(() => cancelAnimationFrame(raf));

      let tiltEl: HTMLElement | null = null;
      const resetTilt = (el: HTMLElement) => {
        el.classList.remove("tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      };
      on(document, "pointermove", (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        if (e.pointerType !== "mouse") return;
        const el = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
        if (tiltEl && tiltEl !== el) resetTilt(tiltEl);
        tiltEl = el;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const max = Number(el.dataset.tilt || 8);
        el.classList.add("tilting");
        el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      });
      on(document, "pointerleave", () => tiltEl && resetTilt(tiltEl));

      // magnetic buttons (delegated, so buttons rendered later also work)
      let magEl: HTMLElement | null = null;
      on(document, "pointermove", (e: PointerEvent) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>(".magnetic");
        if (magEl && magEl !== el) {
          magEl.style.setProperty("--mx", "0px");
          magEl.style.setProperty("--my", "0px");
        }
        magEl = el;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1)}px`);
        el.style.setProperty("--my", `${((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1)}px`);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      root.classList.remove("js-transitions");
    };
  }, []);

  return (
    <>
      <div className="wipe" ref={wipeRef} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((k) => (
          <i key={k} style={{ ["--k" as string]: Math.abs(k - 2) }} />
        ))}
        <div className="wipe-label">{wipeLabel}</div>
      </div>

      <div className={`section-indicator${active > 0 ? " show" : ""}`} aria-hidden="true">
        <span className="si-roll si-num">
          {sections.map((s, i) => (
            <span key={s.id} style={{ transform: `translateY(${-active * 100}%)` }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </span>
        <span>/ {String(sections.length).padStart(2, "0")}</span>
        <span className="si-bar">
          <i ref={barRef} />
        </span>
        <span className="si-roll si-label">
          {sections.map((s) => (
            <span key={s.id} style={{ transform: `translateY(${-active * 100}%)` }}>
              {s.label}
            </span>
          ))}
        </span>
      </div>
    </>
  );
}
