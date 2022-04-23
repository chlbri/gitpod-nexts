import { createContext } from 'react';
import { InterpreterFrom } from 'xstate';
import { MainMachine } from '../machines/main';

export const MainContext = createContext(
  {} as InterpreterFrom<MainMachine>,
);
