import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const testimonials = [
  {
    name: 'Marcus Anderson',
    role: 'CEO, Data.storage',
    text: 'With very little guidance team delivered designs that were consistently spot on...',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'alexwu',
    role: 'Founder, Nexgate',
    text: 'Viktor led the creation of our best fundraising deck to date!...',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'James Mitchell',
    role: 'VP Product, LaunchPad',
    text: 'Working with Viktor transformed our product vision...',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Rachel Foster',
    role: 'Co-founder, Nexus Labs',
    text: 'The design quality exceeded our expectations...',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'David Zhang',
    role: 'Head of Design, Paradigm Labs',
    text: 'Incredible work from start to finish...',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(testimonials.length);
  const [paused, setPaused] = useState(false);
  const tripled = useMemo(() => [...testimonials, ...testimonials, ...testimonials], []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((current) => current + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    if (index >= testimonials.length * 2) {
      const timeout = setTimeout(() => setIndex(testimonials.length), 850);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 flex flex-col gap-6 md:ml-auto md:max-w-4xl md:flex-row md:items-end md:justify-between">
          <h3 className="text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]">
            What <span className="font-mondwest">builders</span> say
          </h3>
          <div className="flex items-center gap-1 text-[#0D212C]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-black text-black" />
            ))}
            <span className="ml-2 text-sm">Clutch 5/5</span>
          </div>
        </div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="overflow-hidden">
            <div
              className="flex gap-6"
              style={{
                transform: `translateX(calc(-${index} * (min(427.5px, calc(100vw - 48px)) + 1.5rem)))`,
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {tripled.map((item, i) => (
                <article key={`${item.name}-${i}`} className="w-[calc(100vw-48px)] shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:w-[427.5px] md:rounded-[40px] md:pl-10 md:pr-24">
                  <svg className="h-8 w-8 text-[#0D212C]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5C5 7 4 10 4 13h5c0 4-2 5-4 6 1 1 2 1 3 1 4-1 6-4 6-9V5H8zm10 0c-3 2-4 5-4 8h5c0 4-2 5-4 6 1 1 2 1 3 1 4-1 6-4 6-9V5h-6z" />
                  </svg>
                  <p className="mt-5 leading-relaxed text-[#0D212C]">{item.text}</p>
                  <div className="mt-8 flex items-center gap-3">
                    <img src={item.avatar} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-[#0D212C]">{item.name}</p>
                      <p className="text-sm text-[#273C46]">→ {item.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20"
              onClick={() => setIndex((prev) => prev - 1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20"
              onClick={() => setIndex((prev) => prev + 1)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
