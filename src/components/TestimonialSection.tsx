import { Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const imageUrl =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85';

export default function TestimonialSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();
  const imageRef = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = 0;
    const maxOffset = 200;

    const update = () => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const value = Math.max(-maxOffset, Math.min(maxOffset, (progress - 0.5) * maxOffset));
      setOffset(value);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) update();
      },
      { threshold: 0.1 },
    );

    if (imageRef.current) observer.observe(imageRef.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-2xl px-6 py-12 text-[#0D212C]">
      <Quote className={`h-6 w-6 text-slate-900 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }} />
      <h2 className={`mt-6 text-[32px] leading-[1.1] tracking-tight md:text-[40px] lg:text-[44px] ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
        I left <span className="font-mondwest">Apple</span> to build the studio I always wanted to work with
      </h2>
      <p className={`mt-5 text-sm italic text-[#273C46] ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
        Viktor Oddy
      </p>
      <div className={`mt-10 flex flex-wrap items-center gap-8 text-2xl font-medium text-slate-900 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
        <span className="w-[80px]">Apple</span>
        <span className="w-[83px]">IDEO</span>
        <span className="w-[110px]">Polygon</span>
      </div>
      <div className={`mt-12 overflow-hidden ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Chris Halaska"
          className="w-full max-w-xs rounded-2xl shadow-lg"
          style={{ transform: `translateY(${offset}px)` }}
        />
      </div>
    </section>
  );
}
