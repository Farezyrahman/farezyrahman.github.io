import { useEffect } from 'react';
import { FiMonitor } from 'react-icons/fi';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import StarBorder from '../blocks/Components/StarBorder/StarBorder';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import CountUp from '../blocks/TextAnimations/CountUp/CountUp';
import { getProjectBySlug } from '../data/projects';
import { asset } from '../lib/asset';

// Metric values are display strings like "95.8%", "5,000+", "~100%". Split
// off the numeric middle so it can be animated with CountUp, keeping any
// leading (~) or trailing (%, +) characters as static text either side.
function splitMetricValue(value: string) {
  const m = value.match(/^([^\d]*)([\d,]+\.?\d*)(.*)$/);
  if (!m) return { prefix: '', number: null as number | null, suffix: value };
  const [, prefix, numStr, suffix] = m;
  const number = parseFloat(numStr.replace(/,/g, ''));
  return { prefix, number: Number.isNaN(number) ? null : number, suffix };
}

export default function ProjectDetail({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project) {
      // Unknown slug — bounce back to the projects section.
      window.location.hash = '#projects';
    }
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <article className="relative pt-32 pb-28">
      <div className="section-shell">
        <a href="#projects" className="btn-ghost mb-8">
          &larr; Back to projects
        </a>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <p className="kicker mb-3">{project.tagline}</p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold mb-3">
              <GradientText colors={['#c6f135', '#e8ff7a', '#8fd93f']} animationSpeed={6}>
                {project.title}
              </GradientText>
            </h1>
          </div>
          <span
            className={`text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full font-medium whitespace-nowrap ${
              project.status === 'public' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/50'
            }`}
          >
            {project.status === 'public' ? 'Public repo' : 'Private repo'}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50 mb-10">
          <span>
            <span className="text-white/30">Role: </span>
            {project.role}
          </span>
          {project.period && (
            <span>
              <span className="text-white/30">When: </span>
              <span className="font-mono text-[13px]">{project.period}</span>
            </span>
          )}
        </div>

        {project.image ? (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-12">
            <img src={asset(project.image)} alt={project.title} className="w-full h-auto object-cover" />
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden border border-white/10 mb-12 h-56 flex flex-col items-center justify-center gap-2"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 25%, transparent), color-mix(in srgb, var(--color-accent-cool) 18%, transparent))',
            }}
          >
            <FiMonitor className="text-white/60" size={32} />
            <span className="text-white/50 text-[10px] uppercase tracking-wider">No public screenshots yet</span>
          </div>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {project.metrics.map((m, i) => {
              const { prefix, number, suffix } = splitMetricValue(m.value);
              return (
                <AnimatedContent key={m.label} distance={30} delay={i * 0.1}>
                  <div className="glass-panel rounded-2xl p-5 text-center">
                    <p className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-accent)] mb-1">
                      {number !== null ? (
                        <>
                          {prefix}
                          <CountUp to={number} duration={1.4} separator="," />
                          {suffix}
                        </>
                      ) : (
                        m.value
                      )}
                    </p>
                    <p className="text-xs text-white/50">{m.label}</p>
                  </div>
                </AnimatedContent>
              );
            })}
          </div>
        )}

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-14 mb-16">
          <div>
            {project.overview && (
              <div className="mb-10">
                <p className="kicker mb-4">Overview</p>
                {project.overview.map((p, i) => (
                  <p key={i} className="text-white/65 leading-relaxed mb-4 text-justify hyphens-auto">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <p className="kicker mb-4">What I did</p>
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-sm text-white/65 leading-relaxed pl-5 relative before:content-['\2192'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="glass-panel rounded-2xl p-6 mb-6">
                <p className="kicker mb-4 text-[10px]">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
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

            {project.href && (
              <StarBorder as="a" href={project.href} target="_blank" rel="noreferrer" color="#c6f135" speed="4s" className="cursor-pointer w-full">
                <span className="font-medium text-sm">View source on GitHub &rarr;</span>
              </StarBorder>
            )}
          </div>
        </div>

        {(() => {
          // The cover image at the top of the page is often also the first
          // gallery shot (it's usually the best screenshot of the project).
          // Filter it back out here so it isn't shown twice on the same page.
          const galleryImages = (project.gallery ?? []).filter((img) => img.src !== project.image);
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
