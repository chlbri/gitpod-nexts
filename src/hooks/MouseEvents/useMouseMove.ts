import { RefObject } from 'react';
import { useEventListener } from './useEventListener';

export function useMouseMove<T extends HTMLElement>(
  handler: () => void,
  ref?: RefObject<T> | null,
) {
  return useEventListener('mousemove', handler, ref);
}
