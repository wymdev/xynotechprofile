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
npm run build      # static export → ./out
```

`next.config.mjs` sets `output: "export"`, so `./out` is plain HTML/CSS/JS. Any static host can serve it.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which:

1. runs `npm ci && npm run build`
2. rsyncs `./out/` to `public_html/` on cPanel

It uses the existing `SSH_PRIVATE_KEY`, `CPANEL_HOST` and `CPANEL_USER` secrets.

## Editing content

| What | Where |
| --- | --- |
| Projects, skills, team, gravity chips | `lib/data.ts` |
| Page sections & copy | `app/page.tsx` |
| Styles (tokens at the top) | `app/globals.css` |
| Project cover art | `lib/projectArt.ts` (used when a project has no `image`) |
| Root files (`robots.txt`, `sitemap.xml`, `app-ads.txt`), team photos | `public/` |

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
