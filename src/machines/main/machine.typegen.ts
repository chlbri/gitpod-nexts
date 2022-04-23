// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    updateLocale: 'LOCALES.UPDATE';
    changeLocale: 'LOCALES.CHANGE_LANGUAGE';
    inc: 'xstate.init';
    startLocalesMachine: 'xstate.init';
  };
  internalEvents: {
    'done.invoke.main.checkingEnvironmentVariables:invocation[0]': {
      type: 'done.invoke.main.checkingEnvironmentVariables:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.main.preparing:invocation[0]': {
      type: 'done.invoke.main.preparing:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
    'done.invoke.localesMachine': {
      type: 'done.invoke.localesMachine';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.localesMachine': {
      type: 'error.platform.localesMachine';
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    checkEnvironmentsVariables: 'done.invoke.main.checkingEnvironmentVariables:invocation[0]';
    prepare: 'done.invoke.main.preparing:invocation[0]';
    start: 'done.invoke.main.starting:invocation[0]';
    localesMachine: 'done.invoke.localesMachine';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    checkEnvironmentsVariables: 'START';
    prepare: 'done.invoke.main.checkingEnvironmentVariables:invocation[0]';
    start: 'done.invoke.main.preparing:invocation[0]';
    localesMachine: 'xstate.init';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'checkingEnvironmentVariables'
    | 'preparing'
    | 'starting'
    | 'started'
    | 'started.locales'
    | 'started.locales.busy'
    | 'started.locales.notBusy'
    | { started?: 'locales' | { locales?: 'busy' | 'notBusy' } };
  tags: 'important';
}
