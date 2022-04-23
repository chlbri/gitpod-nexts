import { RefObject, useCallback, useEffect } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T> | null,
  handler: () => void,
) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      (event.key === 'Escape' || event.key === 'Esc') && handler();
    },
    [handler],
  );

  const handleClickOutside = useCallback(
    (event: Event) => {
      !ref?.current?.contains(event.target as Node) && handler();
    },
    [handler, ref],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside, handleKeyPress]);

}
