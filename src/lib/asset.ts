// Resolves a root-relative public asset path ("/photos/x.jpg") against the
// base URL the site is built for. On a root domain (Vercel, Netlify, a
// *.github.io repo) BASE_URL is "/" and this is a no-op; on a GitHub Pages
// project site it becomes "/<repo>/photos/x.jpg". Kept in one place so the
// data files can keep using plain root paths.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function asset(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return base + path;
}
