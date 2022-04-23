import { RefObject } from 'react';
import { useEventListener } from './useEventListener';

export function useResize<T extends HTMLElement>(
  handler: () => void,
  ref?: RefObject<T> | null,
) {
  return useEventListener('resize', handler, ref);
}
