import { RefObject, useCallback, useLayoutEffect, useState } from 'react';
import { useEventListener } from './useEventListener';
import { useResize } from './useResize';

export function useIsOverflowed<T extends HTMLElement>(
  ref: RefObject<T> | null,
) {
  const [disabled, setDisabled] = useState(true);

  const update = useCallback(() => {
    const out =
      !!ref?.current &&
      ref.current.scrollWidth <= ref.current.clientWidth + 2;
    setDisabled(out);
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref?.current) {
      return;
    }
    update();
  }, [update, ref]);

  useResize(update, ref);
  useEventListener('mouseover', update, ref);

  return [ref, disabled, setDisabled] as const;
}
