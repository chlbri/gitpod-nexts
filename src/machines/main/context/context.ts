import { locales, LocalesContext } from '../../locales';

export type MainContext = {
  iterator: number;
  locales: Pick<LocalesContext, 'current' | 'locale'>;
};

export const mainContext: MainContext = {
  iterator: 0,
  locales: {
    locale: 'fr',
    current: locales.fr,
  },
};
