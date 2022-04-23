import { RefObject, useEffect, useState } from 'react';

export function useOnScreen<T extends HTMLElement>(
  ref: RefObject<T> | null,
  rootMargin: string = '10px',
) {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    const current = ref?.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  return { isIntersecting, ref } as const;
}
