import { RefObject, useCallback, useEffect, useState } from 'react';

export function useDivContainsMouse<T extends HTMLElement>(
  ref: RefObject<T> | null,
  initialVisibility = true,
  excapesKeys = ['Escape', 'Esc'],
) {
  const [isInside, setIsInside] = useState(initialVisibility);

  const handleHideDropdown = useCallback(
    ({ key }: KeyboardEvent) => {
      setIsInside(!excapesKeys.includes(key));
    },
    [excapesKeys],
  );

  const handleClickOutside = useCallback(
    ({ target }: Event) => {
      if (!ref?.current) return;
      setIsInside(!(ref.current && !ref.current.contains(target as Node)));
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside, handleHideDropdown]);

  return {
    ref,
    isInside,
    setIsInside,
  };
}
