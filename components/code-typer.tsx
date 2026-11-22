"use client";

import { useEffect, useRef } from "react";

// Each token: [text, className]. Typed out one character at a time, then loops.
const TOKENS: [string, string][] = [
  ["// ship it — tested, reviewed, monitored\n", "c"],
  ["const ", "k"],
  ["app", ""],
  [" = ", ""],
  ["await ", "k"],
  ["build", "f"],
  ["({\n  stack: ", ""],
  ['"Laravel + Next.js"', "s"],
  [",\n  tests: ", ""],
  ["true", "k"],
  [",\n  support: ", ""],
  ['"24/7"', "s"],
  [",\n});\n\n", ""],
  ["await ", "k"],
  ["deploy", "f"],
  ["(app, { env: ", ""],
  ['"production"', "s"],
  [" });\n", ""],
  ["// ✓ deployed", "c"],
];

export default function CodeTyper() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (n: number) => {
      let left = n;
      el.replaceChildren(
        ...TOKENS.map(([text, cls]) => {
          const part = text.slice(0, Math.max(0, left));
          left -= text.length;
          const span = document.createElement("span");
          if (cls) span.className = cls;
          span.textContent = part;
          return span;
        }),
      );
    };
    const total = TOKENS.reduce((a, [t]) => a + t.length, 0);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(total);
      return;
    }
    let n = 0,
      timer: ReturnType<typeof setTimeout>,
      visible = false;
    const tick = () => {
      if (!visible) return;
      n = n >= total + 60 ? 0 : n + 1; // pause at the end, then restart
      render(Math.min(n, total));
      timer = setTimeout(tick, n >= total ? 50 : 28 + Math.random() * 40);
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      clearTimeout(timer);
      if (visible) tick();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return <code ref={ref} />;
}
