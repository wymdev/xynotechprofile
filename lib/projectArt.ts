import type { Project, Category } from "./data";

// Generated SVG cover art per project, so cards never show a broken image.
// Deterministic: the same project always produces the same picture.

const PALETTE: Record<Category, [string, string]> = {
  web: ["#2563eb", "#22d3ee"],
  mobile: ["#7c3aed", "#ec4899"],
  ai: ["#db2777", "#f59e0b"],
  data: ["#059669", "#22d3ee"],
  security: ["#4f46e5", "#f43f5e"],
};

function rng(seed: number) {
  let a = seed * 9301 + 49297;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PANEL = 'fill="#070b16" fill-opacity=".82" stroke="#fff" stroke-opacity=".14"';
const GLASS = 'fill="#fff" fill-opacity=".1"';

function web(r: () => number, a: string, b: string, id: string) {
  const pts = Array.from({ length: 9 }, (_, i) => [300 + i * 42, 360 - r() * 110]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  return `
  <g transform="translate(110 70)">
    <rect width="580" height="410" rx="20" ${PANEL}/>
    <circle cx="26" cy="24" r="6" fill="#f43f5e"/><circle cx="46" cy="24" r="6" fill="#f59e0b"/><circle cx="66" cy="24" r="6" fill="#10b981"/>
    <rect x="96" y="15" width="300" height="18" rx="9" ${GLASS}/>
    <rect x="18" y="56" width="120" height="336" rx="12" ${GLASS}/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="34" y="${78 + i * 34}" width="${60 + r() * 30}" height="10" rx="5" fill="#fff" fill-opacity="${i === 1 ? 0.7 : 0.25}"/>`).join("")}
    ${[0, 1, 2].map((i) => `<rect x="${156 + i * 136}" y="56" width="124" height="80" rx="12" ${GLASS}/><rect x="${170 + i * 136}" y="72" width="40" height="8" rx="4" fill="#fff" fill-opacity=".4"/><rect x="${170 + i * 136}" y="92" width="${60 + r() * 40}" height="18" rx="6" fill="url(#${id}a)"/>`).join("")}
    <rect x="156" y="152" width="404" height="240" rx="12" ${GLASS}/>
  </g>
  <path d="${line} L636 432 L300 432 Z" transform="translate(-20 30)" fill="url(#${id}a)" fill-opacity=".25"/>
  <path d="${line}" transform="translate(-20 30)" fill="none" stroke="url(#${id}a)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function mobile(r: () => number, _a: string, _b: string, id: string) {
  const phone = (x: number, y: number, rot: number, accent: boolean) => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <rect width="190" height="380" rx="34" fill="#070b16" stroke="#fff" stroke-opacity=".2" stroke-width="3"/>
    <rect x="70" y="14" width="50" height="12" rx="6" fill="#fff" fill-opacity=".2"/>
    <rect x="18" y="44" width="154" height="${accent ? 110 : 70}" rx="16" fill="url(#${id}a)" fill-opacity="${accent ? 1 : 0.5}"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="18" y="${(accent ? 170 : 130) + i * 46}" width="154" height="36" rx="12" fill="#fff" fill-opacity=".08"/><circle cx="38" cy="${(accent ? 188 : 148) + i * 46}" r="9" fill="#fff" fill-opacity=".5"/><rect x="56" y="${(accent ? 184 : 144) + i * 46}" width="${50 + r() * 60}" height="8" rx="4" fill="#fff" fill-opacity=".35"/>`).join("")}
  </g>`;
  return phone(250, 110, -8, false) + phone(400, 70, 6, true);
}

function ai(r: () => number, _a: string, _b: string, id: string) {
  const layers = [3, 5, 5, 3];
  const nodes = layers.map((n, li) => Array.from({ length: n }, (_, i) => [180 + li * 150, 275 + (i - (n - 1) / 2) * 78]));
  let lines = "";
  for (let l = 0; l < nodes.length - 1; l++)
    for (const p of nodes[l])
      for (const q of nodes[l + 1])
        lines += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#fff" stroke-opacity="${0.08 + r() * 0.25}" stroke-width="2"/>`;
  const dots = nodes
    .flat()
    .map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="16" fill="#070b16" stroke="url(#${id}a)" stroke-width="4"/><circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#fff" fill-opacity="${0.4 + r() * 0.6}"/>`)
    .join("");
  return `<circle cx="400" cy="275" r="190" fill="url(#${id}r)"/>${lines}${dots}`;
}

function data(r: () => number, _a: string, _b: string, id: string) {
  const bars = Array.from({ length: 8 }, (_, i) => {
    const h = 60 + r() * 170;
    return `<rect x="${150 + i * 40}" y="${420 - h}" width="24" height="${h}" rx="6" fill="url(#${id}a)" fill-opacity="${0.55 + (i % 3) * 0.2}"/>`;
  }).join("");
  const pct = 0.55 + r() * 0.35;
  const C = 2 * Math.PI * 62;
  return `
  <rect x="110" y="80" width="580" height="390" rx="20" ${PANEL}/>
  <rect x="134" y="104" width="160" height="14" rx="7" fill="#fff" fill-opacity=".45"/>
  <rect x="134" y="128" width="100" height="10" rx="5" fill="#fff" fill-opacity=".2"/>
  ${bars}
  <rect x="490" y="104" width="176" height="170" rx="14" ${GLASS}/>
  <circle cx="578" cy="189" r="62" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="16"/>
  <circle cx="578" cy="189" r="62" fill="none" stroke="url(#${id}a)" stroke-width="16" stroke-linecap="round" stroke-dasharray="${C * pct} ${C}" transform="rotate(-90 578 189)"/>
  <rect x="490" y="290" width="176" height="56" rx="14" ${GLASS}/><rect x="490" y="358" width="176" height="56" rx="14" ${GLASS}/>
  <rect x="506" y="312" width="${70 + r() * 70}" height="12" rx="6" fill="#fff" fill-opacity=".35"/><rect x="506" y="380" width="${70 + r() * 70}" height="12" rx="6" fill="#fff" fill-opacity=".35"/>`;
}

function security(r: () => number, _a: string, _b: string, id: string) {
  let grid = "";
  for (let y = 0; y < 7; y++)
    for (let x = 0; x < 12; x++) {
      const on = r() > 0.82;
      grid += `<rect x="${70 + x * 58}" y="${70 + y * 60}" width="44" height="44" rx="10" fill="#fff" fill-opacity="${on ? 0.22 : 0.05}"/>`;
    }
  return `${grid}
  <path d="M400 110 L520 155 V265 C520 345 465 395 400 425 C335 395 280 345 280 265 V155 Z" fill="#070b16" stroke="url(#${id}a)" stroke-width="8"/>
  <rect x="360" y="255" width="80" height="66" rx="12" fill="url(#${id}a)"/>
  <path d="M374 255 V232 a26 26 0 0 1 52 0 V255" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
  <circle cx="400" cy="285" r="8" fill="#070b16"/>
  <rect x="0" y="0" width="800" height="4" fill="#fff" fill-opacity=".5"><animate attributeName="y" values="60;490;60" dur="4s" repeatCount="indefinite"/></rect>`;
}

const DRAW = { web, mobile, ai, data, security };

/** Escape text for use inside an SVG/HTML attribute. */
const attr = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function projectArt(p: Project): string {
  const [a, b] = PALETTE[p.category] ?? PALETTE.web;
  const id = `pa${Number(p.id) | 0}`;
  const r = rng(p.id);
  return `<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${attr(p.title)} illustration">
  <defs>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <radialGradient id="${id}r" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}s" cx=".85" cy=".05" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <pattern id="${id}p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".07"/></pattern>
  </defs>
  <rect width="800" height="550" fill="#05070d"/>
  <rect width="800" height="550" fill="url(#${id}g)" opacity=".92"/>
  <rect width="800" height="550" fill="url(#${id}p)"/>
  <rect width="800" height="550" fill="url(#${id}s)"/>
  ${(DRAW[p.category] ?? web)(r, a, b, id)}
</svg>`;
}
