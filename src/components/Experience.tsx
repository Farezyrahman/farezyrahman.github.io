import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';
import SpotlightCard from '../blocks/Components/SpotlightCard/SpotlightCard';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import Lightbox from './Lightbox';
import { internship, activities } from '../data/experience';
import { asset } from '../lib/asset';

interface InternPhoto {
  src: string;
  caption: string;
}

const INTERN_PHOTOS: InternPhoto[] = [
  { src: '/photos/internship-team-outing.jpg', caption: 'Team outing with the Ace Star Tech crew' },
  { src: '/photos/internship-office.jpg', caption: 'Ace Star Tech Software Integration — the office wall on day one' },
  { src: '/photos/internship-firstday.jpg', caption: 'First day of the internship' },
];

function InternPhotoTile({
  photo,
  className,
  onOpen,
}: {
  photo: InternPhoto;
  className: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${photo.caption}`}
      className={`relative rounded-2xl overflow-hidden border border-white/10 group text-left cursor-zoom-in ${className}`}
    >
      <img
        src={asset(photo.src)}
        alt={photo.caption}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white">
        <FiZoomIn size={14} />
      </span>
      <p className="absolute bottom-0 left-0 right-0 p-3 text-xs text-white/85 leading-snug">{photo.caption}</p>
    </button>
  );
}

export default function Experience() {
  const [open, setOpen] = useState<InternPhoto | null>(null);

  return (
    <section id="experience" className="relative py-28">
      <div className="section-shell">
        <p className="kicker mb-4">Where I've worked</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          <GradientText colors={['#c6f135', '#e8ff7a', '#8fd93f']} animationSpeed={6}>
            Experience
          </GradientText>
        </h2>
        <p className="text-white/60 max-w-xl mb-14">
          A five-month internship rotating across three very different projects, plus leadership
          roles running video and XR programs at UTM.
        </p>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 mb-16">
          {/* Photo mosaic: wide team shot on top, then the office wall and a
              portrait side by side — each at an aspect that fits the photo
              instead of cropping everything to the same tall box. */}
          {/* One column on a phone — side-by-side tiles get too small there for
              the caption overlay to stay readable. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit lg:sticky lg:top-24">
            <AnimatedContent distance={30} className="sm:col-span-2">
              <InternPhotoTile photo={INTERN_PHOTOS[0]} className="w-full aspect-[4/3]" onOpen={() => setOpen(INTERN_PHOTOS[0])} />
            </AnimatedContent>
            <AnimatedContent distance={30} delay={0.08}>
              <InternPhotoTile photo={INTERN_PHOTOS[1]} className="w-full aspect-[4/3] sm:aspect-[4/5]" onOpen={() => setOpen(INTERN_PHOTOS[1])} />
            </AnimatedContent>
            <AnimatedContent distance={30} delay={0.16}>
              <InternPhotoTile photo={INTERN_PHOTOS[2]} className="w-full aspect-[4/3] sm:aspect-[4/5]" onOpen={() => setOpen(INTERN_PHOTOS[2])} />
            </AnimatedContent>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="font-display text-xl font-semibold text-white">{internship.role}</h3>
              <span className="font-mono text-[11px] text-white/40">{internship.period}</span>
            </div>
            <p className="text-sm text-[var(--color-accent)] mb-4">{internship.company}</p>
            <p className="text-sm text-white/60 leading-relaxed mb-6 sm:text-justify hyphens-auto">{internship.summary}</p>

            <div className="space-y-4">
              {internship.rotations.map((rotation, i) => (
                <AnimatedContent key={rotation.title} distance={30} delay={i * 0.08}>
                  <SpotlightCard spotlightColor="rgba(198, 241, 53, 0.16)" className="!p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h4 className="font-display text-sm font-semibold text-white">{rotation.title}</h4>
                      <span className="font-mono text-[11px] text-white/40 whitespace-nowrap">{rotation.period}</span>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {rotation.bullets.map((b) => (
                        <li key={b} className="text-xs text-white/60 leading-relaxed pl-3 relative before:content-['\2013'] before:absolute before:left-0 before:text-white/30">
                          {b}
                        </li>
                      ))}
                    </ul>
                    {rotation.projectSlug && (
                      <a href={`#/project/${rotation.projectSlug}`} className="btn-pill">
                        View project details &rarr;
                      </a>
                    )}
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="kicker mb-6">Leadership &amp; activities</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {activities.map((activity, i) => (
              <AnimatedContent key={activity.title} distance={30} delay={i * 0.08}>
                <SpotlightCard spotlightColor="rgba(198, 241, 53, 0.14)" className="!p-5 flex flex-col h-full">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] text-white/40">{activity.period}</span>
                  </div>
                  <h4 className="font-display text-sm font-semibold text-white mb-2 leading-snug">{activity.title}</h4>
                  <p className="text-xs text-white/55 leading-relaxed">{activity.description}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>

      {open && <Lightbox src={open.src} alt={open.caption} caption={open.caption} onClose={() => setOpen(null)} />}
    </section>
  );
}
