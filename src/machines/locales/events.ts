import { LocalesContext } from './context';

export type LocalesEvents =
  | {
      type: 'START';
    }
  | { type: 'CHANGE_LANGUAGE'; locale: keyof LocalesContext['locales'] };
