# XynoTech — Company Website

The XynoTech IT Solutions site: a Next.js app exported as a fully static site and deployed to cPanel.

**Highlights**

- **Gravity hero:** tech-stack chips are real DOM elements driven by [Matter.js](https://brm.io/matter-js/). They fall onto the headline. You can drag and throw them with a mouse or tap them on touch screens, and there are *Drop more*, *Zero-G* and *Reset* controls.
- **Three.js scenes:** a liquid-metal core in the hero and an interactive globe (Yangon → the world) in About, built with `@react-three/fiber` + `drei`. Both pause when off-screen. If WebGL is unavailable, the scenes are skipped and the rest of the page still works.
- **Section transitions:** each section grows in as a rounded panel while the one above recedes. The page morphs into a light "paper" theme for the Process section. A rolling section indicator sits in the left gutter, and nav jumps use a full-screen wipe.
- **3D cards:** tilt and spotlight on hover, flip cards for team profiles, a 3D icon orbit for skills, generated SVG artwork for projects, and a filterable project grid with a detail modal.
- **Accessibility:** respects `prefers-reduced-motion`, with keyboard-operable cards and a skip link.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # static export → ./out, plus CSP hashes and .htaccess
```

`next.config.mjs` sets `output: "export"`, so `./out` is plain HTML/CSS/JS. Any static host can serve it.

## Deploy

### Coolify (Docker)

1. Create a new resource from this Git repository.
2. Set **Build Pack** to **Dockerfile** and **Ports Exposes** to **80**.
3. Deploy. The image builds the static site with Node 22 and serves it from a hardened nginx (`deploy/nginx/`).

Don't use the Nixpacks build pack. It would try `next start`, which doesn't work with a static export.

### cPanel (GitHub Actions)

Pushing to `main` runs `.github/workflows/deploy.yml`, which:

1. runs `npm ci`, `npm audit --audit-level=high` and `npm run build`
2. rsyncs `./out/` to `public_html/`

It uses the `SSH_PRIVATE_KEY`, `CPANEL_HOST` and `CPANEL_USER` secrets. If you move fully to Coolify, delete this workflow so the two deploys don't both run.

## Security

`npm run build` runs `scripts/postbuild-security.mjs` after the Next.js build. It hashes every inline script and generates a strict **Content-Security-Policy** with no `unsafe-inline` for scripts. The policy goes to `build-security/csp.conf` for nginx and to `out/.htaccess` for Apache/cPanel.

| Threat | Protection |
| --- | --- |
| XSS | Strict CSP with script hashes; no `innerHTML` with data; escaped JSON-LD and SVG attributes; project links limited to `http(s)` |
| Clickjacking | `X-Frame-Options: DENY`, `frame-ancestors 'none'` |
| Directory listing / file exposure | `autoindex off` / `Options -Indexes`; hidden files (`.git`, `.env`, `.htaccess`) never served; no source maps |
| Tampered CDN file | Subresource Integrity hash on Font Awesome |
| DoS / floods (nginx) | Per-IP rate limit (15 r/s, burst 60) and connection cap, short timeouts against slow clients, 1 KB max body, only `GET`/`HEAD` |
| Scraping / AI crawlers | `robots.txt` opt-out, `noai` meta tag and header, server-side user-agent blocking, email and phone assembled in the browser (not in the HTML) |
| Other headers | HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, COOP/CORP, hidden server version |
| Dependencies | `npm audit` is clean; the deploy fails on high/critical advisories |

**Large DDoS attacks:** rate limiting on the server only stops floods from a few IP addresses. To absorb large, distributed attacks, put the domain behind **Cloudflare** (the free plan is enough). If you do, trust Cloudflare's IP ranges and `CF-Connecting-IP` in `deploy/nginx/default.conf`.

## Editing content

| What | Where |
| --- | --- |
| Projects, skills, team, gravity chips | `lib/data.ts` |
| Page sections & copy | `app/page.tsx` |
| Styles (tokens at the top) | `app/globals.css` |
| Project cover art | `lib/projectArt.ts` (used when a project has no `image`) |
| Site address (share previews, canonical URL, sitemap, robots.txt) | `lib/site.ts`, or set `NEXT_PUBLIC_SITE_URL` at build time |
| Link-preview image (1200×630) | `public/og.jpg` |
| `robots.txt` / `sitemap.xml` | `app/robots.ts`, `app/sitemap.ts` |
| Other root files (`app-ads.txt`, `security.txt`), team photos | `public/` |

To use a real screenshot for a project, put it in `public/` and set `image: "/your-file.jpg"`. Leave `demoUrl` and `githubUrl` empty to hide those buttons.

The contact form opens the visitor's email app with the message pre-filled, because the static site has no backend. To collect submissions directly, point it at a form service such as Formspree in `components/contact-form.tsx`.

## Structure

```
app/            layout, page, global styles
components/     effects (transitions, reveal, tilt), gravity-stage, hero-scene & globe (Three.js),
                projects, skills, team, nav, contact-form, code-typer
lib/            data.ts (content), projectArt.ts
public/         static files copied to the site root
```

## Contact

support@xynotechmm.com · +95 9 4543 7511 6 · [LinkedIn](https://linkedin.com/company/xynotech-mm)
