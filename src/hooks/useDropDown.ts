import {
  CSSProperties,
  MouseEventHandler,
  RefObject,
  useCallback,
  useState as useS,
} from 'react';
import { useOnClickOutside } from './MouseEvents/useOnClickOutside';

export function useDropDown<T extends HTMLElement>(
  ref: RefObject<T> | null,
  value = false,
) {
  const [open, setOpen] = useS(value);

  const onClick: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      setOpen(bol => !bol);
    },
    [setOpen],
  );

  const handler = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const opacity = open ? 1 : 0;
  const transform = open ? 'none' : 'translateY(-20px)';

  const dropDownStyle: CSSProperties = {
    opacity,
    transform,
    position: 'absolute',
  };

  useOnClickOutside(ref, handler);

  return {
    onClick,
    dropDownStyle,
    ref,
    open,
  } as const;
}
