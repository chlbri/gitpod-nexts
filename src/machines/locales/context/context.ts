import { locales } from './locales';

export type LocalesContext = {
  iterator: number;
  locales: typeof locales;
  locale: keyof typeof locales;
  current: typeof locales[keyof typeof locales];
};

export const localesContext: LocalesContext = {
  iterator: 0,
  locales,
  locale: 'fr',
  current: locales.fr,
};
