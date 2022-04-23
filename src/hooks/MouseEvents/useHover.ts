import { RefObject, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useHover<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | null,
) {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEventListener('mouseenter', handleMouseEnter, ref);
  useEventListener('mouseleave', handleMouseLeave, ref);

  return { ref, value };
}
