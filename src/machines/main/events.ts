import { LocalesContext } from '../locales';

type Locale = keyof LocalesContext['locales'];

export type MainEvents =
  | {
      type: 'LOCALES.UPDATE';
      locale: Locale;
      current: LocalesContext['current'];
    }
  | {
      type: 'LOCALES.CHANGE_LANGUAGE';
      locale: Locale;
    }
  | { type: 'START' };
