import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// BASE_PATH is set by the GitHub Pages workflow ("/<repo>/" for a project
// site, "/" for a *.github.io root site). Vercel / Netlify / local dev leave
// it unset and get "/". Asset paths in components go through src/lib/asset.ts
// so they follow this value.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
})
