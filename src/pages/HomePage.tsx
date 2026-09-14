import { HeadTags } from '@/components/seo/HeadTags';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { DevelopmentApproach } from '@/components/sections/DevelopmentApproach';
import { Contact } from '@/components/sections/Contact';
import { buildHomeJsonLd, homeSeo } from '@/lib/seo';

export function HomePage() {
  const seo = homeSeo();

  return (
    <>
      <HeadTags {...seo} jsonLd={buildHomeJsonLd()} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <DevelopmentApproach />
      <Contact />
    </>
  );
}
