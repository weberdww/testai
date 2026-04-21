import { useMemo } from 'react';
import BottomNav from './components/BottomNav';
import Button from './components/Button';
import CopyrightBar from './components/CopyrightBar';
import Footer from './components/Footer';
import PartnerSection from './components/PartnerSection';
import PricingSection from './components/PricingSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import TestimonialSection from './components/TestimonialSection';
import { useInViewAnimation } from './hooks/useInViewAnimation';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

function HeroSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();
  return (
    <section ref={ref} className="mx-auto max-w-[440px] px-6 pb-8 pt-12 md:pt-16">
      <p className={`mb-4 font-mondwest text-[32px] font-semibold tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
        Viktor Oddy
      </p>
      <p className={`mb-2 font-mono text-xs text-[#051A24] md:text-sm ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
        The creative studio of Viktor Oddy
      </p>
      <h1 className={`whitespace-nowrap text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
        Build the <span className="font-mondwest">next wave</span>,<br />
        the <span className="font-mondwest">bold way.</span>
      </h1>
      <div className={`mt-5 flex flex-col gap-6 text-sm leading-relaxed text-[#051A24] md:mt-6 md:text-base ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
        <p>I spent seven years at Apple crafting products used by over a billion people. I founded Vortex Studio to bring that same level of thinking to innovators shaping what comes next.</p>
        <p>The studio is deliberately small. I guide the creative vision on every project, backed by a veteran design crew that moves fast without cutting corners.</p>
        <p>Projects start at $5,000 per month.</p>
      </div>
      <div className={`mt-5 flex flex-col gap-3 sm:flex-row md:mt-6 md:gap-4 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
        <Button>Start a chat</Button>
        <Button variant="secondary">View projects</Button>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const images = useMemo(() => [...marqueeImages, ...marqueeImages], []);
  return (
    <section className="mb-16 mt-16 w-full overflow-hidden md:mt-20">
      <div className="marquee-track flex w-max animate-marquee">
        {images.map((image, index) => (
          <img key={`${image}-${index}`} src={image} alt={`Showcase ${index + 1}`} className="mx-3 h-[280px] rounded-2xl object-cover shadow-lg md:h-[500px]" />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-white pb-24 text-[#051A24]">
      <HeroSection />
      <MarqueeSection />
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <ProjectsSection />
      <PartnerSection />
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </main>
  );
}
