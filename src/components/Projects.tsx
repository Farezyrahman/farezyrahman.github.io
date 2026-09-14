import { FiMonitor } from 'react-icons/fi';
import SpotlightCard from '../blocks/Components/SpotlightCard/SpotlightCard';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import { projects } from '../data/projects';
import { coursework } from '../data/coursework';
import { asset } from '../lib/asset';

// Cycled per card so a run of screenshot-less projects doesn't all render
// the exact same placeholder tile.
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 30%, transparent), color-mix(in srgb, var(--color-accent-cool) 25%, transparent))',
  'linear-gradient(135deg, color-mix(in srgb, var(--color-accent-cool-2) 28%, transparent), color-mix(in srgb, var(--color-accent-pink) 22%, transparent))',
  'linear-gradient(135deg, color-mix(in srgb, var(--color-accent-warm) 28%, transparent), color-mix(in srgb, var(--color-accent) 22%, transparent))',
];

function ProjectImagePlaceholder({ title, index }: { title: string; index: number }) {
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center gap-2 text-center px-4"
      style={{ background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length] }}
    >
      <FiMonitor className="text-white/70" size={28} />
      <span className="text-white/70 text-xs font-medium leading-snug">{title}</span>
      <span className="text-white/40 text-[10px] uppercase tracking-wider">Screenshot coming soon</span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="section-shell">
        <p className="kicker mb-4">Selected work</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          <GradientText colors={['#c6f135', '#e8ff7a', '#c6f135']} animationSpeed={6}>
            Projects
          </GradientText>
        </h2>
        <p className="text-white/60 max-w-xl mb-14">
          Internship rotations, my final year project, and team builds — each card opens into a full
          write-up with screenshots and the real tech stack.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedContent key={project.slug} distance={40} delay={(i % 2) * 0.1}>
            <a href={`#/project/${project.slug}`} className="block group">
              <SpotlightCard
                spotlightColor="rgba(198, 241, 53, 0.22)"
                className="!p-0 overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[var(--color-surface-2)]">
                  {project.image ? (
                    <img
                      src={asset(project.image)}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ProjectImagePlaceholder title={project.title} index={i} />
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[11px] uppercase tracking-wider px-2 py-1 rounded-full font-medium ${
                        project.status === 'public'
                          ? 'bg-emerald-400/15 text-emerald-300'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {project.status === 'public' ? 'Public repo' : 'Private repo'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[11px] text-white/40 whitespace-nowrap pt-1">{project.year}</span>
                  </div>
                  <p className="text-sm text-white/50 mb-3">{project.tagline}</p>
                  <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full border text-[var(--color-accent-cool)]"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-accent-cool) 35%, transparent)',
                          background: 'color-mix(in srgb, var(--color-accent-cool) 8%, transparent)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                    <span className="text-xs text-white/40">{project.role}</span>
                    <span className="btn-pill group-hover:bg-[var(--color-accent)] group-hover:text-black">
                      View details &rarr;
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </a>
            </AnimatedContent>
          ))}
        </div>

        <div className="mt-20">
          <p className="kicker mb-2">Real-Time Computer Graphics</p>
          <h3 className="font-display text-xl font-semibold text-white mb-2">Coursework &amp; experiments</h3>
          <p className="text-white/50 text-sm max-w-2xl mb-8">
            Real-Time Computer Graphics is where most of my XR fundamentals actually clicked —
            marker-based AR, hand tracking, hosted multi-user spaces, and NPC interaction, each
            explored as its own focused exercise rather than one big project. Every card below opens
            into a full write-up with screenshots, same as the projects above.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coursework.map((item, i) => (
              <AnimatedContent key={item.slug} distance={40} delay={(i % 4) * 0.08}>
                <a
                  href={`#/coursework/${item.slug}`}
                  className="flex flex-col group rounded-2xl overflow-hidden border border-white/10 bg-[var(--color-surface)] hover:border-white/25 transition-colors h-full"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-[var(--color-surface-2)]">
                    <img
                      src={asset(item.image)}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-display text-sm font-semibold text-white mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed mb-3">{item.description}</p>
                    <span className="btn-pill mt-auto self-start group-hover:bg-[var(--color-accent)] group-hover:text-black">
                      View write-up &rarr;
                    </span>
                  </div>
                </a>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
