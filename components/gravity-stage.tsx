"use client";

import { useEffect, useRef, useState } from "react";
import type * as MatterNS from "matter-js";
import { gravityChips } from "../lib/data";

type Chip = { el: HTMLElement; body: MatterNS.Body };

/**
 * Google-Gravity-style playground: tech chips are real DOM nodes driven by Matter.js.
 * They fall onto the hero copy (every [data-solid] element is a static body),
 * can be dragged & thrown with a mouse, and bounce when tapped on touch screens.
 */
export default function GravityStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const api = useRef<{ drop: (n: number) => void; reset: () => void; zeroG: (on: boolean) => void } | null>(null);
  const [zero, setZero] = useState(false);
  const [isStatic, setStatic] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const hero = stage?.closest<HTMLElement>(".hero");
    if (!stage || !hero) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    const makeChipEl = (i: number) => {
      const d = gravityChips[i % gravityChips.length];
      const el = document.createElement("div");
      el.className = `g-chip ${d.color}${d.orb ? " orb" : ""}`;
      el.innerHTML = `<i class="${d.icon}"></i>${d.label ? `<span>${d.label}</span>` : ""}`;
      return el;
    };

    if (reduced) {
      setStatic(true);
      for (let i = 0; i < 14; i++) stage.appendChild(makeChipEl(i));
      return () => {
        stage.innerHTML = "";
      };
    }

    import("matter-js")
      .then((mod) => {
        if (disposed) return;
        const Matter = (mod as any).default ?? mod;
        const { Engine, Bodies, Body, Composite, Constraint } = Matter as typeof MatterNS;

        const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });
        const world = engine.world;
        const chips: Chip[] = [];
        let W = 0,
          H = 0;
        let walls: MatterNS.Body[] = [];
        let solids: MatterNS.Body[] = [];
        let zeroG = false;
        let copyRight = 0; // right edge of the hero copy, so most chips fall beside it

        const baseCount = () => (innerWidth < 640 ? 14 : innerWidth < 1100 ? 22 : gravityChips.length);

        const buildBounds = () => {
          W = stage.clientWidth;
          H = stage.clientHeight;
          Composite.remove(world, walls);
          const t = 200;
          walls = [
            Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true }), // floor
            Bodies.rectangle(-t / 2, H / 2 - H, t, H * 4, { isStatic: true }),
            Bodies.rectangle(W + t / 2, H / 2 - H, t, H * 4, { isStatic: true }),
            Bodies.rectangle(W / 2, -H * 1.5 - t / 2, W * 3, t, { isStatic: true }), // high ceiling
          ];
          Composite.add(world, walls);
        };

        const buildSolids = () => {
          Composite.remove(world, solids);
          const sr = stage.getBoundingClientRect();
          // On narrow screens the copy spans the full width, so chips fall past it to the floor.
          const wide = W >= 860;
          const els = Array.from(hero.querySelectorAll<HTMLElement>("[data-solid]")).filter((el) => wide || !el.closest(".hero-copy"));
          copyRight = 0;
          solids = els.map((el) => {
            const r = el.getBoundingClientRect();
            if (el.closest(".hero-copy")) copyRight = Math.max(copyRight, r.right - sr.left);
            return Bodies.rectangle(r.left - sr.left + r.width / 2, r.top - sr.top + r.height / 2, r.width, r.height, {
              isStatic: true,
              chamfer: { radius: Math.min(16, r.height / 2) },
              friction: 0.4,
            });
          });
          Composite.add(world, solids);
        };

        const addChip = (i: number, x?: number, y?: number) => {
          const el = makeChipEl(i);
          stage.appendChild(el);
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          const d = gravityChips[i % gravityChips.length];
          const besideCopy = copyRight > 0 && W - copyRight > 200 && Math.random() < 0.85;
          const px = x ?? (besideCopy ? copyRight + 30 + Math.random() * (W - copyRight - 70) : 40 + Math.random() * (W - 80));
          const py = y ?? -60 - Math.random() * H * 0.9;
          const opts = { restitution: 0.45, friction: 0.08, frictionAir: 0.012, density: 0.0018 };
          const body = d.orb
            ? Bodies.circle(px, py, w / 2, opts)
            : Bodies.rectangle(px, py, w, h, { ...opts, chamfer: { radius: h / 2 } });
          Body.setAngle(body, (Math.random() - 0.5) * 0.8);
          Composite.add(world, body);
          const chip = { el, body };
          chips.push(chip);
          bindPointer(chip);
          return chip;
        };

        // ---- dragging (mouse/pen) and tap-to-bounce (touch) ----
        let drag: MatterNS.Constraint | null = null;
        const local = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          return { x: e.clientX - r.left, y: e.clientY - r.top };
        };
        const bindPointer = ({ el, body }: Chip) => {
          if (matchMedia("(hover: none)").matches) el.style.touchAction = "pan-y";
          let downAt = { x: 0, y: 0, t: 0 };
          el.addEventListener("pointerdown", (e) => {
            downAt = { x: e.clientX, y: e.clientY, t: performance.now() };
            if (e.pointerType === "touch") return;
            e.preventDefault();
            el.setPointerCapture(e.pointerId);
            el.classList.add("dragging");
            const p = local(e);
            drag = Constraint.create({
              pointA: p,
              bodyB: body,
              pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
              stiffness: 0.18,
              damping: 0.08,
              length: 0,
            });
            Composite.add(world, drag);
          });
          el.addEventListener("pointermove", (e) => {
            if (drag && drag.bodyB === body) drag.pointA = local(e);
          });
          const release = (e: PointerEvent) => {
            el.classList.remove("dragging");
            if (drag && drag.bodyB === body) {
              Composite.remove(world, drag);
              drag = null;
            }
            const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
            if (e.type === "pointerup" && moved < 8 && performance.now() - downAt.t < 350) {
              Body.setVelocity(body, { x: (Math.random() - 0.5) * 14, y: -14 - Math.random() * 8 });
              Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);
            }
          };
          el.addEventListener("pointerup", release);
          el.addEventListener("pointercancel", release);
        };

        // ---- cursor "wind": fast mouse movement pushes nearby chips ----
        let last = { x: 0, y: 0, t: 0 };
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" || drag) return;
          const p = local(e);
          const now = performance.now();
          const dt = Math.max(16, now - last.t);
          const vx = (p.x - last.x) / dt,
            vy = (p.y - last.y) / dt;
          last = { ...p, t: now };
          const speed = Math.hypot(vx, vy);
          if (speed < 0.6) return;
          for (const { body } of chips) {
            const dx = body.position.x - p.x,
              dy = body.position.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 110) {
              const f = 0.0009 * body.mass * Math.min(speed, 4);
              Body.applyForce(body, body.position, { x: vx * f, y: vy * f - 0.0004 * body.mass });
            }
          }
        };
        hero.addEventListener("pointermove", onMove);

        // ---- loop ----
        let raf = 0;
        let running = false;
        let lastT = 0;
        const frame = (t: number) => {
          raf = requestAnimationFrame(frame);
          const dt = Math.min(32, lastT ? t - lastT : 16.67);
          lastT = t;
          if (zeroG) {
            for (const { body } of chips) {
              const drift = 0.00002 * body.mass;
              Body.applyForce(body, body.position, {
                x: (Math.random() - 0.5) * drift,
                y: (Math.random() - 0.5) * drift + (body.position.y < 0 ? 0.00008 * body.mass : 0),
              });
            }
          }
          Engine.update(engine, dt);
          for (const { el, body } of chips) {
            const { x, y } = body.position;
            el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px, 0) rotate(${body.angle}rad)`;
          }
        };
        const start = () => {
          if (running) return;
          running = true;
          lastT = 0;
          raf = requestAnimationFrame(frame);
        };
        const stop = () => {
          running = false;
          cancelAnimationFrame(raf);
        };

        const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0 });

        const begin = () => {
          if (disposed) return;
          buildBounds();
          buildSolids();
          for (let i = 0; i < baseCount(); i++) addChip(i);
          io.observe(hero);
          start();
        };

        // Wait for the preloader and the headline animation, so the solids are measured in their final place.
        const kickoff = () => setTimeout(() => document.fonts.ready.then(begin), 900);
        if ((window as any).__xynoReady) kickoff();
        else window.addEventListener("xyno:ready", kickoff, { once: true });

        let resizeT: ReturnType<typeof setTimeout>;
        const onResize = () => {
          clearTimeout(resizeT);
          resizeT = setTimeout(() => {
            if (!W) return;
            buildBounds();
            buildSolids();
            for (const { body } of chips) {
              const { x, y } = body.position;
              Body.setPosition(body, { x: Math.min(Math.max(x, 30), W - 30), y: Math.min(y, H - 30) });
            }
          }, 200);
        };
        window.addEventListener("resize", onResize);

        api.current = {
          drop: (n) => {
            if (chips.length > 70) {
              const old = chips.splice(0, n);
              old.forEach((c) => {
                Composite.remove(world, c.body);
                c.el.remove();
              });
            }
            for (let k = 0; k < n; k++) addChip(Math.floor(Math.random() * gravityChips.length), 60 + Math.random() * (W - 120), -60 - k * 50);
          },
          reset: () => {
            chips.splice(0).forEach((c) => {
              Composite.remove(world, c.body);
              c.el.remove();
            });
            buildSolids();
            for (let i = 0; i < baseCount(); i++) addChip(i);
          },
          zeroG: (onFlag) => {
            zeroG = onFlag;
            engine.gravity.y = onFlag ? 0 : 1;
            if (onFlag)
              for (const { body } of chips) {
                Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: -2 - Math.random() * 5 });
                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
              }
          },
        };

        cleanup = () => {
          stop();
          io.disconnect();
          hero.removeEventListener("pointermove", onMove);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("xyno:ready", kickoff);
          Composite.clear(world, false);
          Engine.clear(engine);
          stage.innerHTML = "";
        };
      })
      .catch(() => {
        // Physics failed to load: show a tidy static cloud instead.
        setStatic(true);
        for (let i = 0; i < 14; i++) stage.appendChild(makeChipEl(i));
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <>
      <div ref={stageRef} className={`gravity-stage${isStatic ? " static" : ""}`} aria-hidden="true" />
      <div className="gravity-controls" role="group" aria-label="Gravity playground controls" data-solid>
        <span className="gravity-hint">
          <i className="fas fa-hand-pointer" /> <span className="hint-mouse">Drag &amp; throw the stack</span>
          <span className="hint-touch">Tap the stack to bounce it</span>
        </span>
        <button type="button" className="chip-btn" onClick={() => api.current?.drop(6)}>
          <i className="fas fa-plus" /> Drop more
        </button>
        <button
          type="button"
          className="chip-btn"
          aria-pressed={zero}
          onClick={() => {
            const next = !zero;
            setZero(next);
            api.current?.zeroG(next);
          }}
        >
          <i className="fas fa-user-astronaut" /> Zero-G
        </button>
        <button
          type="button"
          className="chip-btn"
          onClick={() => {
            setZero(false);
            api.current?.zeroG(false);
            api.current?.reset();
          }}
        >
          <i className="fas fa-rotate-right" /> Reset
        </button>
      </div>
    </>
  );
}
