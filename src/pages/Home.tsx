import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import SectionDivider from '../components/SectionDivider';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SectionDivider color="var(--color-accent)" />
      <Experience />
      <SectionDivider color="var(--color-accent-cool)" />
      <Skills />
      <SectionDivider color="var(--color-accent-cool-2)" />
      <Projects />
      <SectionDivider color="var(--color-accent-warm)" />
      <Gallery />
      <SectionDivider color="var(--color-accent-pink)" />
      <Certifications />
      <SectionDivider color="var(--color-accent)" />
      <Contact />
    </>
  );
}
