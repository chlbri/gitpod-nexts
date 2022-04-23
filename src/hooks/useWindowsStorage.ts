import { useState } from 'react';

function useWindowStorage<T>(
  key: string,
  initialValue: T,
  store: 'localStorage' | 'sessionStorage',
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window[store].getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window[store].setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  return useWindowStorage(key, initialValue, 'localStorage');
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  return useWindowStorage(key, initialValue, 'sessionStorage');
}
