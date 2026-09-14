import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const SECTION_IDS = LINKS.map((l) => l.id);

export default function Nav({ isDetailView = false }: { isDetailView?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight whichever section's top has most recently crossed
  // a "reading line" near the top of the viewport. This is robust to
  // sections of any height (unlike a narrow-band IntersectionObserver ratio
  // comparison, which misfires when a section is shorter than the band).
  // Only runs on the Home view — a detail page has no section ids to watch.
  useEffect(() => {
    if (isDetailView) {
      setActiveId(null);
      return;
    }

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const readingLine = window.innerHeight * 0.35;
      let currentId: string | null = null;
      for (const el of sections) {
        const top = el.getBoundingClientRect().top;
        if (top <= readingLine) {
          currentId = el.id;
        }
      }
      setActiveId(currentId);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isDetailView]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-300 ${
          scrolled ? 'glass-panel shadow-lg shadow-black/40' : 'bg-transparent'
        }`}
      >
        <a
          href="#top"
          className="font-display font-semibold text-sm px-3 py-1.5 mr-2 rounded-full text-white/90"
        >
          FA<span className="text-gradient">.</span>
        </a>
        {LINKS.map((link) => {
          const isActive = activeId === link.id;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'true' : undefined}
              className={`relative text-sm transition-colors px-3.5 py-1.5 rounded-full ${
                isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-[var(--color-accent)]" />
              )}
            </a>
          );
        })}
        <a
          href="#contact"
          className="ml-1 text-sm font-medium px-4 py-1.5 rounded-full bg-[var(--color-accent)] text-black hover:opacity-90 transition-opacity"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
