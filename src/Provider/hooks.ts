import { useSelector } from '@xstate/react';
import { useContext as useContextReact } from 'react';
import { Subscribable } from 'xstate';
import { Interpreter } from '../machines/main';
import { MainContext } from './context';

export function useContext() {
  return useContextReact(MainContext);
}

export function useSend() {
  const service = useContext();
  return service.send;
}

export function useState<
  T,
  TEmitted = Interpreter extends Subscribable<infer Emitted>
    ? Emitted
    : never,
>(
  selector: (emitted: TEmitted) => T,
  compare?: (a: T, b: T) => boolean,
  getSnapshot?: (a: Interpreter) => TEmitted,
): T {
  const service = useContext();
  return useSelector(service, selector, compare, getSnapshot);
}
