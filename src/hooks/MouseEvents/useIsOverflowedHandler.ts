import { RefObject, useCallback, useLayoutEffect } from 'react';
import { useResize } from './useResize';

export function useIsOverflowedHandler<T extends HTMLElement>(
  ref: RefObject<T> | null,
  handler: () => void,
) {
  const update = useCallback(() => {
    if (!ref?.current) {
      return;
    }
    const out = ref.current.scrollWidth <= ref.current.clientWidth;
    out && handler();
  }, [handler, ref]);

  useLayoutEffect(() => {
    if (!ref?.current) {
      return;
    }
    update();
  }, [ref, update]);

  useResize(update, ref);

  return ref;
}
