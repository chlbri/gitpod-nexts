import { assign } from '@xstate/immer';
import { createMachine, sendParent } from 'xstate';
import { LocalesContext, localesContext } from './context';
import { LocalesEvents } from './events';

export const localesMachine = createMachine(
  {
    initial: 'idle',
    context: localesContext,
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as LocalesContext,
      events: {} as LocalesEvents,
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
      changeLocale: assign((context, { locale }) => {
        context.locale = locale;
      }),
      changeCurrent: assign(context => {
        context.current = context.locales[context.locale];
      }),
      inc: assign(context => {
        context.iterator++;
      }),
      updateParent: sendParent(ctx => ({
        type: 'LOCALES.UPDATE',
        locale: ctx.locale,
        current: ctx.current,
      })),
    },
  },
);
