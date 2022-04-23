import { useInterpret } from '@xstate/react';
import { FC, ReactNode } from 'react';
import { mainMachine } from '../machines/main';
import { MainContext } from './context';

type Props = {
  children: ReactNode;
};

const Provider: FC<Props> = ({ children }) => {
  const value = useInterpret(mainMachine);
  return (
    <MainContext.Provider {...{ value }}>{children}</MainContext.Provider>
  );
};

export default Provider;
export * from './hooks';
