import { useEffect } from 'react';
import { FiX, FiExternalLink } from 'react-icons/fi';
import { asset } from '../lib/asset';

interface LightboxProps {
  src: string;
  alt: string;
  caption?: string;
  pdfHref?: string;
  onClose: () => void;
}

// Simple, dependency-free image pop-out: click a thumbnail elsewhere in the
// page, get a large centered view here. Closes on Escape, backdrop click, or
// the close button, and locks page scroll while open.
export default function Lightbox({ src, alt, caption, pdfHref, onClose }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'color-mix(in srgb, black 82%, transparent)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
      >
        <FiX size={20} />
      </button>

      <div
        className="relative max-w-4xl w-full max-h-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={asset(src)}
          alt={alt}
          className="max-h-[75vh] w-auto max-w-full rounded-xl border border-white/10 shadow-2xl shadow-black/60 object-contain"
        />
        {(caption || pdfHref) && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center px-2">
            {caption && <p className="text-sm text-white/70">{caption}</p>}
            {pdfHref && (
              <a
                href={pdfHref}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-ghost"
              >
                Open original PDF <FiExternalLink size={13} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
