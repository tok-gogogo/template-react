import { createModel } from 'hox';
import app from '@xylib/module/app/app';
import { useState } from 'react';

type ThenArg<T> = T extends Promise<infer U> ? U : T;

type IInitialState = ThenArg<ReturnType<typeof app.defineInitState>> | undefined;

function useInitialStateFun() {
  const [state, setState] = useState<IInitialState>();

  return {
    // @ts-ignore
    ...state,
    setState,
  };
}

const useInitialState = createModel(useInitialStateFun);

export default useInitialState;
