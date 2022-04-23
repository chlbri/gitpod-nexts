import { useCallback, useState } from 'react';

export function useNumber(initialValue = 0) {
  const [value, setValue] = useState(initialValue);

  const increment = useCallback(() => setValue(x => x + 1), []);
  const decrement = useCallback(() => setValue(x => x - 1), []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return {
    value,
    increment,
    decrement,
    reset,
    setValue,
  } as const;
}
