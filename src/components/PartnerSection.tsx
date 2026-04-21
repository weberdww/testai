import { useEffect, useRef, useState } from 'react';
import Button from './Button';

type Trail = { id: number; x: number; y: number; rotation: number; image: string };

const images = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

export default function PartnerSection() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const interval = requestAnimationFrame(function cleanup() {
      setTrails((prev) => prev.filter((t) => Date.now() - t.id < 1000));
      requestAnimationFrame(cleanup);
    });
    return () => cancelAnimationFrame(interval);
  }, []);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTrails((prev) => [
      ...prev,
      {
        id: now,
        x,
        y,
        rotation: Math.random() * 20 - 10,
        image: images[Math.floor(Math.random() * images.length)],
      },
    ]);
  };

  return (
    <section className="w-full px-6 py-12">
      <div ref={containerRef} onMouseMove={onMouseMove} className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-white px-6 py-48 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        {trails.map((trail) => (
          <img
            key={trail.id}
            src={trail.image}
            alt="trail"
            className="pointer-events-none absolute h-20 w-20 rounded-xl object-cover"
            style={{
              left: trail.x,
              top: trail.y,
              transform: `translate(-50%, -50%) rotate(${trail.rotation}deg) scale(${1 - (Date.now() - trail.id) / 1000})`,
              opacity: 1 - (Date.now() - trail.id) / 1000,
              transition: 'opacity 0.2s linear, transform 0.2s linear',
            }}
          />
        ))}
        <h3 className="relative z-10 font-mondwest text-[48px] leading-none text-[#0D212C] md:text-[64px] lg:text-[80px]">Partner with us</h3>
        <div className="relative z-10 mt-12 flex justify-center">
          <Button className="gap-3">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="Viktor"
              className="h-10 w-10 rounded-full object-cover"
            />
            Start chat with Viktor
          </Button>
        </div>
      </div>
    </section>
  );
}
