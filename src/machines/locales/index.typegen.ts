// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    changeLocale: 'CHANGE_LANGUAGE';
    inc: 'xstate.init';
    updateParent: '';
    changeCurrent: 'CHANGE_LANGUAGE';
  };
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'started'
    | 'started.normal'
    | 'started.changing'
    | { started?: 'normal' | 'changing' };
  tags: never;
}
