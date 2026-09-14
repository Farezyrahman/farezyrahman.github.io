import { useCallback, useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile menu; so does growing past the mobile breakpoint
  // (otherwise rotating a phone to landscape leaves an orphaned open sheet).
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen, closeMenu]);

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
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      {/* Desktop: the full pill. It needs ~780px of room, so anything narrower
          gets the compact bar + menu sheet below instead of a nav that
          overflows the screen on both sides. */}
      <nav
        className={`hidden lg:flex mx-auto w-fit items-center gap-1 rounded-full px-2 py-2 transition-all duration-300 ${
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

      {/* Mobile / tablet */}
      <div className="lg:hidden relative mx-auto w-full max-w-md">
        <div
          className={`relative z-10 flex items-center justify-between rounded-full pl-4 pr-2 py-2 transition-all duration-300 ${
            scrolled || menuOpen ? 'glass-panel shadow-lg shadow-black/40' : 'bg-transparent'
          }`}
        >
          <a href="#top" className="font-display font-semibold text-sm text-white/90" onClick={closeMenu}>
            FA<span className="text-gradient">.</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={closeMenu}
              className="text-sm font-medium px-4 py-1.5 rounded-full bg-[var(--color-accent)] text-black"
            >
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-black/40 text-white/80 hover:text-white transition-colors"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <>
            {/* Tap anywhere else to dismiss. */}
            <div className="fixed inset-0 z-0" onClick={closeMenu} aria-hidden="true" />
            {/* Near-opaque rather than the usual glass: a full-height sheet of
                links over the hero is unreadable if the page shows through. */}
            <nav
              className="relative z-10 mt-2 rounded-2xl p-2 shadow-xl shadow-black/50 border border-white/10"
              style={{ background: 'color-mix(in srgb, var(--color-bg) 94%, transparent)', backdropFilter: 'blur(20px)' }}
            >
              {LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm transition-colors ${
                      isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: isActive ? 'var(--color-accent)' : 'color-mix(in srgb, white 20%, transparent)',
                      }}
                    />
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
