# Muhammad Farezy — Portfolio

Personal portfolio of Muhammad Farezy Bin Ab Rahman: VR/XR developer, AI & computer-vision
engineer, and part-time photographer/videographer. Built from scratch with React, TypeScript,
Vite and Tailwind CSS v4, with animated components adapted from React Bits.

Fully static — no backend, no database. Everything runs in the browser.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Deploy

**GitHub Pages (automatic).** Push to `main`; the workflow in
`.github/workflows/deploy.yml` builds and publishes the site. One-time setup in the repo:
*Settings → Pages → Build and deployment → Source: GitHub Actions*. The workflow detects
whether the repo is `<user>.github.io` (served from `/`) or a named repo (served from
`/<repo>/`) and sets the base path accordingly.

**Vercel / Netlify.** Import the repo; both detect Vite automatically (`vercel.json` /
`netlify.toml` are included). No environment variables needed.

## Project layout

```
src/
  components/   Page sections (Hero, About, Experience, Skills, Projects, Gallery, …)
  pages/        Home, ProjectDetail, CourseworkDetail (hash-routed)
  data/         Content: projects, coursework, experience, certifications
  blocks/       Vendored React Bits animation components
  lib/asset.ts  Resolves /public asset paths against the deploy base path
public/
  photos/ projects/ coursework/ certs/   Images referenced from src/data
```

Routing is hash-based (`#/project/<slug>`, `#/coursework/<slug>`) so the site works from
any hosting path without server-side rewrites.
