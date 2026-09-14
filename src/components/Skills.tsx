import { useEffect, useRef, useState } from 'react';
import {
  SiUnity,
  SiPython,
  SiOpencv,
  SiPytorch,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiJavascript,
  SiGit,
  SiBlender,
} from 'react-icons/si';
import GlassIcons, { type GlassIconsItem } from '../blocks/Components/GlassIcons/GlassIcons';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import DotGrid from '../blocks/Backgrounds/DotGrid/DotGrid';

const CSharpGlyph = () => (
  <span className="font-display font-bold text-[18px] tracking-tight">C#</span>
);

const items: GlassIconsItem[] = [
  { icon: <SiUnity size={22} />, color: 'indigo', label: 'Unity' },
  { icon: <CSharpGlyph />, color: 'purple', label: 'C#' },
  { icon: <SiPython size={22} />, color: 'blue', label: 'Python' },
  { icon: <SiOpencv size={22} />, color: 'green', label: 'OpenCV' },
  { icon: <SiPytorch size={22} />, color: 'orange', label: 'PyTorch' },
  { icon: <SiPhp size={22} />, color: 'indigo', label: 'PHP' },
  { icon: <SiLaravel size={22} />, color: 'red', label: 'Laravel' },
  { icon: <SiPostgresql size={22} />, color: 'blue', label: 'PostgreSQL' },
  { icon: <SiJavascript size={22} />, color: 'orange', label: 'JavaScript' },
  { icon: <SiGit size={22} />, color: 'red', label: 'Git' },
  { icon: <SiBlender size={22} />, color: 'purple', label: 'Blender' },
];

export default function Skills() {
  // DotGrid runs a continuous canvas redraw loop for as long as it's mounted.
  // Since this is a single-page app the section never unmounts on its own, so
  // without this the background would keep animating (and burning CPU/battery)
  // even while the user is scrolled far away reading another section. Only
  // mount it while the section is actually near the viewport.
  const sectionRef = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        {nearViewport && (
          <DotGrid
            dotSize={3}
            gap={26}
            baseColor="#232b1a"
            activeColor="#c6f135"
            proximity={120}
            shockRadius={200}
            shockStrength={3}
          />
        )}
      </div>
      <div className="section-shell">
        <AnimatedContent distance={24}>
          <p className="kicker mb-4">What I work with</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
            <GradientText colors={['#e8ff7a', '#c6f135', '#8fd93f', '#c6f135', '#e8ff7a']} animationSpeed={6}>
              Skills &amp; Tools
            </GradientText>
          </h2>
          <p className="text-white/60 max-w-xl mb-14">
            A mix of real-time 3D development and applied AI, plus enough full-stack web to ship a
            complete product end to end.
          </p>
        </AnimatedContent>

        <AnimatedContent distance={30} delay={0.1}>
          <GlassIcons items={items} className="!static !w-full !max-w-none !grid !grid-cols-2 sm:!grid-cols-3 md:!grid-cols-4 lg:!grid-cols-6 !gap-x-4 !gap-y-16" />
        </AnimatedContent>
      </div>
    </section>
  );
}
