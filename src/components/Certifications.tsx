import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';
import SpotlightCard from '../blocks/Components/SpotlightCard/SpotlightCard';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import Lightbox from './Lightbox';
import { certifications } from '../data/certifications';
import { asset } from '../lib/asset';

export default function Certifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openCert = openIndex !== null ? certifications[openIndex] : null;

  return (
    <section id="certifications" className="relative py-28">
      <div className="section-shell">
        <p className="kicker mb-4">Credentials</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          <GradientText colors={['#8fd93f', '#c6f135', '#e8ff7a']} animationSpeed={6}>
            Certifications
          </GradientText>
        </h2>
        <p className="text-white/60 max-w-xl mb-14">
          Workshops, talks, and a paper presentation from my time at UTM's Faculty of Computing.
          Click any certificate to view it full-size.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <AnimatedContent key={cert.title} distance={40} delay={(i % 3) * 0.08}>
              <SpotlightCard
                spotlightColor="rgba(198, 241, 53, 0.18)"
                className="!p-0 overflow-hidden flex flex-col h-full"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`View ${cert.title} full-size`}
                  className="relative h-40 w-full overflow-hidden bg-[var(--color-surface-2)] border-b border-white/5 group cursor-zoom-in"
                >
                  <img
                    src={asset(cert.image)}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-medium text-white px-3 py-1.5 rounded-full bg-black/60 border border-white/20">
                      <FiZoomIn size={13} />
                      View full-size
                    </span>
                  </div>
                </button>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-sm font-semibold text-white mb-1 leading-snug">{cert.title}</h3>
                  <p className="text-[11px] text-[var(--color-accent)] mb-1">{cert.issuer}</p>
                  <p className="font-mono text-[11px] text-white/40 mb-3">{cert.date}</p>
                  <p className="text-xs text-white/55 leading-relaxed flex-1">{cert.description}</p>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>

      {openCert && (
        <Lightbox
          src={openCert.image}
          alt={openCert.title}
          caption={`${openCert.title} — ${openCert.issuer}`}
          pdfHref={openCert.pdf}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
