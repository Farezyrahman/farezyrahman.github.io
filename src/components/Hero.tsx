import Aurora from '../blocks/Backgrounds/Aurora/Aurora';
import SplitText from '../blocks/TextAnimations/SplitText/SplitText';
import TextType from '../blocks/TextAnimations/TextType/TextType';
import StarBorder from '../blocks/Components/StarBorder/StarBorder';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import { asset } from '../lib/asset';

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10 opacity-45">
        <Aurora colorStops={['#1c2b0f', '#5fa82a', '#c6f135']} amplitude={0.5} blend={0.35} speed={0.6} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/40 to-[var(--color-bg)]" />

      <div className="section-shell relative pt-32 pb-24 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          <div>
            <p className="kicker mb-5">Portfolio &middot; Johor, Malaysia</p>

            <SplitText
              text="Muhammad Farezy"
              tag="h1"
              className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white"
              splitType="chars"
              delay={22}
              duration={0.7}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />
            <h1 className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8">
              <GradientText colors={['#e8ff7a', '#c6f135', '#8fd93f', '#c6f135', '#e8ff7a']} animationSpeed={5}>
                Bin Ab Rahman
              </GradientText>
            </h1>

            <div className="text-xl sm:text-2xl text-white/70 font-display h-9 mb-8">
              <TextType
                text={['VR / AR Developer', 'AI & Computer Vision Engineer', 'Full-Stack Developer']}
                typingSpeed={55}
                pauseDuration={1800}
                deletingSpeed={30}
                className="text-white/80"
                cursorCharacter="_"
              />
            </div>

            <p className="max-w-xl text-white/60 text-base sm:text-lg mb-10 leading-relaxed">
              Computer Science graduate from Universiti Teknologi Malaysia building immersive VR experiences
              and AI-powered tools — from Unity XR simulators to computer vision pipelines that turn floor
              plans into 3D models.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <StarBorder as="a" href="#projects" color="#e8ff7a" speed="4s" className="cursor-pointer">
                <span className="font-medium">View my work</span>
              </StarBorder>
              <a href="#contact" className="btn-ghost">
                Get in touch &rarr;
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] bg-[var(--color-accent)]/20 blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
              <img
                src={asset('/photos/profile-photo.jpg')}
                alt="Muhammad Farezy Bin Ab Rahman"
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
