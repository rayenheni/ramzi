import {
  About,
  Contact,
  Experience,
  Hero,
  MediationSection,
  Practice,
  TeamSection,
} from '../sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Practice showHeader />
      <About />
      <TeamSection />
      <Experience showHeader />
      <MediationSection />
      <Contact showHeader />
    </>
  );
}
