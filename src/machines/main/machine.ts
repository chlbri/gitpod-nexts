import { assign } from '@xstate/immer';
import { createMachine, send } from 'xstate';
import { localesMachine } from '../locales/machine';
import { mainContext as context, MainContext } from './context';
import { MainEvents } from './events';

const voidAsync = () => Promise.resolve() as never;

export const mainMachine = createMachine(
  {
    initial: 'idle',
    tsTypes: {} as import('./machine.typegen').Typegen0,
    context,
    schema: {
      context: {} as MainContext,
      events: {} as MainEvents,
    },
    states: {
      idle: {
        exit: 'inc',
        on: {
          START: {
            target: 'checkingEnvironmentVariables',
          },
        },
      },
      checkingEnvironmentVariables: {
        exit: 'inc',
        invoke: {
          src: 'checkEnvironmentsVariables',
          onDone: [
            {
              target: 'preparing',
            },
          ],
        },
      },
      preparing: {
        exit: 'inc',
        invoke: {
          src: 'prepare',
          onDone: [
            {
              target: 'starting',
            },
          ],
        },
      },
      starting: {
        exit: 'inc',
        invoke: {
          src: 'start',
          onDone: {
            target: '#started',
          },
        },
      },
      started: {
        type: 'parallel',
        id: 'started',
        states: {
          locales: {
            entry: 'startLocalesMachine',
            exit: 'inc',
            id: 'locales',
            invoke: {
              id: 'localesMachine',
              src: 'localesMachine',
            },
            tags: 'important',
            on: {
              'LOCALES.UPDATE': {
                actions: 'updateLocale',
                target: '.busy',
              },
            },
            initial: 'busy',
            states: {
              busy: {
                after: {
                  170: 'notBusy',
                },
              },
              notBusy: {
                on: {
                  'LOCALES.CHANGE_LANGUAGE': {
                    actions: 'changeLocale',
                    target: 'busy',
                  },
                },
              },
            },
          },
        },
      },
    },
    id: 'main',
  },
  {
    actions: {
      inc: assign(context => {
        context.iterator++;
      }),
      changeLocale: send(
        (_, { locale }) => ({
          type: 'CHANGE_LANGUAGE',
          locale,
        }),
        { to: 'localesMachine' },
      ),
      startLocalesMachine: send('START', { to: 'localesMachine' }),
      updateLocale: assign((context, { current, locale }) => {
        context.locales.current = current;
        context.locales.locale = locale;
      }),
    },
    services: {
      localesMachine,
      checkEnvironmentsVariables: voidAsync,
      prepare: voidAsync,
      start: voidAsync,
    },
  },
);
