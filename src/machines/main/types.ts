import { InterpreterFrom, StateFrom } from 'xstate';
import { mainMachine } from './machine';

export type MainMachine = typeof mainMachine;
export type Interpreter = InterpreterFrom<MainMachine>;
export type State = StateFrom<MainMachine>;
