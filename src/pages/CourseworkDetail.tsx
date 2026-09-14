import { useEffect } from 'react';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import StarBorder from '../blocks/Components/StarBorder/StarBorder';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import { getCourseworkBySlug } from '../data/coursework';
import { asset } from '../lib/asset';

export default function CourseworkDetail({ slug }: { slug: string }) {
  const item = getCourseworkBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!item) {
      window.location.hash = '#projects';
    }
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <article className="relative pt-32 pb-28">
      <div className="section-shell">
        <a href="#projects" className="btn-ghost mb-8">
          &larr; Back to projects
        </a>

        <p className="kicker mb-3">{item.subtitle}</p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold mb-3">
          <GradientText colors={['#c6f135', '#e8ff7a', '#8fd93f']} animationSpeed={6}>
            {item.title}
          </GradientText>
        </h1>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50 mb-10">
          <span>
            <span className="text-white/30">Course: </span>
            {item.course}
          </span>
          <span>
            <span className="text-white/30">When: </span>
            <span className="font-mono text-[13px]">{item.period}</span>
          </span>
        </div>

        {item.image && (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-12">
            <img src={asset(item.image)} alt={item.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-14 mb-16">
          <div>
            {item.overview.length > 0 && (
              <div className="mb-10">
                <p className="kicker mb-4">Overview</p>
                {item.overview.map((p, i) => (
                  <p key={i} className="text-white/65 leading-relaxed mb-4 text-justify hyphens-auto">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {item.highlights.length > 0 && (
              <div>
                <p className="kicker mb-4">What I did</p>
                <ul className="space-y-3">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm text-white/65 leading-relaxed pl-5 relative before:content-['\2192'] before:absolute before:left-0 before:text-[var(--color-accent)]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {item.techStack.length > 0 && (
              <div className="glass-panel rounded-2xl p-6 mb-6">
                <p className="kicker mb-4 text-[10px]">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full border text-[var(--color-accent-cool)]"
                      style={{
                        borderColor: 'color-mix(in srgb, var(--color-accent-cool) 35%, transparent)',
                        background: 'color-mix(in srgb, var(--color-accent-cool) 8%, transparent)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.href && (
              <StarBorder as="a" href={item.href} target="_blank" rel="noreferrer" color="#c6f135" speed="4s" className="cursor-pointer w-full">
                <span className="font-medium text-sm">View source on GitHub &rarr;</span>
              </StarBorder>
            )}
          </div>
        </div>

        {(() => {
          // The hero image above is usually also the strongest gallery shot —
          // filter it back out here so it isn't repeated on the same page.
          const galleryImages = item.gallery.filter((img) => img.src !== item.image);
          if (galleryImages.length === 0) return null;
          return (
          <div>
            <p className="kicker mb-6">Screenshots</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {galleryImages.map((img, i) => (
                <AnimatedContent key={img.src} distance={40} delay={(i % 2) * 0.08}>
                  <figure className="rounded-2xl overflow-hidden border border-white/10 bg-[var(--color-surface)]">
                    <img src={asset(img.src)} alt={img.caption} loading="lazy" className="w-full h-auto object-cover" />
                    <figcaption className="text-xs text-white/50 px-4 py-3 border-t border-white/5">{img.caption}</figcaption>
                  </figure>
                </AnimatedContent>
              ))}
            </div>
          </div>
          );
        })()}
      </div>
    </article>
  );
}
