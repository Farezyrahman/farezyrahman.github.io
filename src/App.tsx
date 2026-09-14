import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import CourseworkDetail from './pages/CourseworkDetail';

// Custom hash-based routing (no react-router). This is deliberate: the site
// is shipped as a single static HTML file that can end up hosted at a
// nested, unpredictable path (a Claude Artifact URL, a GitHub Pages
// project path, or plain "/" in local dev). Anything based on the History
// API / real pathnames breaks under a nested path. Hash-only routing works
// identically everywhere because it never depends on the path prefix.
//
// Scheme: "#/project/<slug>" and "#/coursework/<slug>" select detail views.
// Any other hash (including empty, or a plain section id like "#about")
// stays on Home and scrolls to that section id if it exists.

type Route = { type: 'project' | 'coursework'; slug: string } | null;

function getRouteFromHash(hash: string): Route {
  const m = hash.match(/^#\/(project|coursework)\/([^/?#]+)/);
  if (!m) return null;
  return { type: m[1] as 'project' | 'coursework', slug: decodeURIComponent(m[2]) };
}

function scrollToHashTarget(hash: string) {
  const id = hash.replace(/^#/, '');
  if (!id || id === 'top') {
    window.scrollTo(0, 0);
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView();
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRouteFromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      const newRoute = getRouteFromHash(window.location.hash);
      setRoute(newRoute);
      if (!newRoute) {
        // Let Home mount first, then scroll to the target section.
        requestAnimationFrame(() => scrollToHashTarget(window.location.hash));
      } else {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  let content;
  if (route?.type === 'project') {
    content = <ProjectDetail slug={route.slug} />;
  } else if (route?.type === 'coursework') {
    content = <CourseworkDetail slug={route.slug} />;
  } else {
    content = <Home />;
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-x-hidden">
      <Nav isDetailView={!!route} />
      <main>{content}</main>
      <Footer />
    </div>
  );
}

export default App;
