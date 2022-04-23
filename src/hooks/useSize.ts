import { RefObject, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type Size = {
  width?: number;
  height?: number;
};

export function useSize<T extends HTMLElement>(
  ref: RefObject<T> | null,
): Size {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  const current = ref?.current;
  useIsomorphicLayoutEffect(() => {
    function handleResize() {
      setSize({
        width: current?.offsetHeight,
        height: current?.offsetWidth,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [current?.offsetHeight, current?.offsetWidth]);
  return size;
}
