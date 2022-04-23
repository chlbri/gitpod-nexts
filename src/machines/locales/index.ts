// import { assign } from '@xstate/immer';
import { assign, createMachine, sendParent } from 'xstate';

export * from './context';
export * from './events';
export * from './machine';

type LocalesContext<L extends Record<string, unknown>> = {
  iterator: number;
  locales: L;
  locale: keyof L;
  current: L[keyof L];
};

type LocalesEvents<L extends Record<string, unknown>> =
  | {
      type: 'START';
    }
  | { type: 'CHANGE_LANGUAGE'; locale: keyof L };

export function createLocaleMachine<L extends Record<string, unknown>>(
  locales: L,
  defaultLocale: keyof L,
) {
  const context: LocalesContext<L> = {
    iterator: 0,
    locales,
    locale: defaultLocale,
    current: locales[defaultLocale],
  };
  return createMachine(
    {
      initial: 'idle',
      context,
      tsTypes: {} as import('./index.typegen').Typegen0,
      schema: {
        context: {} as LocalesContext<L>,
        events: {} as LocalesEvents<L>,
      },
      states: {
        idle: {
          exit: 'inc',
          on: {
            START: {
              target: 'started',
            },
          },
        },
        started: {
          initial: 'changing',
          states: {
            normal: {
              entry: 'updateParent',
              exit: 'inc',
              on: {
                CHANGE_LANGUAGE: {
                  actions: 'changeLocale',
                  target: 'changing',
                },
              },
            },
            changing: {
              entry: 'changeCurrent',
              exit: 'inc',
              always: 'normal',
            },
          },
        },
      },
      id: 'locales',
    },
    {
      actions: {
        changeLocale: assign({ locale: (_, { locale }) => locale }),

        changeCurrent: assign({
          current: (context, { locale }) => context.locales[locale],
        }),

        inc: assign({ iterator: context => context.iterator + 1 }),

        updateParent: sendParent(({ current, locale }) => ({
          type: 'LOCALES.UPDATE' as const,
          locale,
          current,
        })),
      },
    },
  );
}
