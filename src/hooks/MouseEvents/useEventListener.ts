import { RefObject, useLayoutEffect } from 'react';

export function useEventListener<T extends HTMLElement>(
  event: keyof WindowEventMap,
  handler: () => void,
  elementRef?: RefObject<T> | null,
) {
  return useLayoutEffect(() => {
    const ref = elementRef?.current ?? window;
    ref.addEventListener(event, handler);
    return () => ref.removeEventListener(event, handler);
  }, [event, handler, elementRef]);
}
