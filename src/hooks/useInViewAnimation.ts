import { RefObject, useEffect, useRef, useState } from 'react';

export function useInViewAnimation<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref: ref as RefObject<T>, inView };
}
