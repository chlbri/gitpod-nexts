/* eslint-disable react/jsx-key */
import { FC, useEffect } from 'react';
import { useSend } from '../Provider';

function useStart() {
  const send = useSend();
  useEffect(() => {
    send('START');
  }, [send]);
}

function useHook() {
  useStart();
}

const Index: FC = () => {
  useHook();
  return (
    <div className="bg-gray-100 pb-20">
      <div className="max-w-[1200px] w-11/12 flex flex-col mx-auto  space-y-5"></div>
    </div>
  );
};

export default Index;
