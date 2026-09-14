import { SiFacebook, SiInstagram, SiGithub } from 'react-icons/si';
import StarBorder from '../blocks/Components/StarBorder/StarBorder';
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Farezyrahman', Icon: SiGithub },
  { label: 'Facebook', href: 'https://fb.com/farezyrahman', Icon: SiFacebook },
  { label: 'Instagram', href: 'https://instagram.com/farezyrahman', Icon: SiInstagram },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="section-shell text-center flex flex-col items-center">
        <p className="kicker mb-4">Let's talk</p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6 max-w-2xl">
          Building a VR or AI project?{' '}
          <span className="text-gradient">I'd love to help.</span>
        </h2>
        <p className="text-white/60 max-w-lg mb-10">
          <ShinyText text="Open to VR Developer and Software Developer roles, plus freelance collaborations." speed={3} />
        </p>

        <StarBorder as="a" href="mailto:farezy111@gmail.com" color="#c6f135" speed="4s" className="cursor-pointer mb-10">
          <span className="font-medium">farezy111@gmail.com</span>
        </StarBorder>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
