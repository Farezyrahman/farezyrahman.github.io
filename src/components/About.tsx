import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import { asset } from '../lib/asset';

// Each fact card carries a photo of its own behind a dark gradient — all
// shot by or of Ezy, so there's nothing stock about them: the UTM campus in
// Skudai for "Based in", a convocation shot for Education, the Wau Bulan VR
// flying-field map for Focus, and a formal portrait for Currently.
const FACTS = [
  {
    label: 'Based in',
    value: 'Johor, Malaysia',
    image: '/photos/facts-johor.jpg',
    position: '50% 35%',
    color: 'var(--color-accent-cool)',
  },
  {
    label: 'Education',
    value: 'B.Sc Computer Science (Graphics & Multimedia), UTM · CGPA 3.43',
    image: '/photos/facts-utm.jpg',
    position: '50% 30%',
    color: 'var(--color-accent)',
  },
  {
    label: 'Focus',
    value: 'VR/XR development & applied AI',
    image: '/photos/facts-focus.jpg',
    position: '50% 50%',
    color: 'var(--color-accent-cool-2)',
  },
  {
    label: 'Currently',
    value: 'Open to VR Developer and Software Developer roles',
    image: '/photos/facts-open.jpg',
    position: '50% 15%',
    color: 'var(--color-accent-warm)',
  },
];

const EDUCATION = [
  {
    school: 'Universiti Teknologi Malaysia (UTM), Skudai',
    program: 'B.Sc Computer Science (Graphics & Multimedia Software), With Honours',
    period: 'Oct 2022 – Oct 2026',
    detail: "CGPA 3.43/4.00 · Dean's List (Semester 5–8)",
  },
  {
    school: 'Kolej Matrikulasi Kejuruteraan Johor, Pontian',
    program: 'Matriculation in Civil Engineering',
    period: 'Aug 2021 – May 2022',
    detail: 'CGPA 3.67 · MUET Band 4',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="section-shell grid md:grid-cols-2 gap-14 items-start">
        <AnimatedContent distance={30}>
        <div>
          <p className="kicker mb-4">About me</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
            I like building things people can{' '}
            <GradientText colors={['#e8ff7a', '#c6f135', '#8fd93f']} animationSpeed={5}>
              step inside of
            </GradientText>
            .
          </h2>
          <p className="text-white/60 leading-relaxed mb-4 sm:text-justify hyphens-auto">
            I'm a final-year Computer Science student at Universiti Teknologi Malaysia, specialising
            in Graphics and Multimedia Software, with hands-on experience across VR/XR development,
            applied machine learning, and full-stack backend systems. My Final Year Project is a VR
            simulator that teaches the traditional Malaysian craft of Wau Bulan kite-making — from raw
            materials to a kite flying in the wind — and it's what got me hooked on building
            immersive, hands-on experiences rather than just flat screens.
          </p>
          <p className="text-white/60 leading-relaxed mb-4 sm:text-justify hyphens-auto">
            During a software development internship at Ace Star Tech Software Integration, I rotated
            across three very different builds: an AI pipeline that turns 2D floor plans into
            interactive 3D models, a PostgreSQL-backed e-invoicing platform aligned with Malaysia's
            LHDN regulations, and a 3D digital-human avatar with synchronized facial rigging and
            voice. I like projects where a user can immediately see and touch the result of the
            underlying tech.
          </p>
          <p className="text-white/60 leading-relaxed mb-8 sm:text-justify hyphens-auto">
            Outside the lab, I lead the technical crew for UTM's XR exchange programs (most recently
            MEXRA '25 at the University of Tokyo) and shoot part-time as a photographer &amp;
            videographer for our university's creative club — sitting on its photo &amp; video
            committee, covering everything from workshop briefings to campus showcases. It means I'm
            just as comfortable handed a Unity project as I am handed a camera, and a fair number of
            the shots in the gallery below are ones I took rather than ones I'm standing in.
          </p>

          <p className="kicker mb-4">Education</p>
          <div className="space-y-5">
            {EDUCATION.map((edu, i) => (
              <AnimatedContent key={edu.school} distance={20} delay={i * 0.08}>
                <div className="border-l-2 border-[var(--color-accent)]/30 pl-4">
                  <p className="text-sm font-medium text-white/90 leading-snug mb-1.5">{edu.program}</p>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="font-mono text-[11px] text-[var(--color-accent-cool)] whitespace-nowrap">
                      {edu.period}
                    </span>
                    {/* On a phone the school name wraps to its own line, which
                        would leave this separator dangling at the end of the
                        date — so it only appears when the two sit together. */}
                    <span className="text-white/20 hidden sm:inline" aria-hidden="true">
                      &middot;
                    </span>
                    <p className="text-xs text-white/50">{edu.school}</p>
                  </div>
                  <p className="text-xs text-white/40 mt-1">{edu.detail}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
        </AnimatedContent>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit md:sticky md:top-24">
          {FACTS.map((fact, i) => (
            <AnimatedContent key={fact.label} distance={30} delay={i * 0.08}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[11rem] group">
                <img
                  src={asset(fact.image)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: fact.position }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, color-mix(in srgb, black 35%, transparent) 0%, color-mix(in srgb, black 78%, transparent) 60%, color-mix(in srgb, black 92%, transparent) 100%)',
                  }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: fact.color, opacity: 0.8 }}
                />
                <div className="relative p-5 flex flex-col justify-end h-full min-h-[11rem]">
                  <p className="kicker mb-2 text-[10px]" style={{ color: fact.color }}>
                    {fact.label}
                  </p>
                  <p className="text-white text-sm leading-snug font-medium">{fact.value}</p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
