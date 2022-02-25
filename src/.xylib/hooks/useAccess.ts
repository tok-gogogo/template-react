import { useState } from 'react';

import { createModel } from 'hox';
import app from '@xylib/module/app/app';

export type IAccessState = ReturnType<typeof app.defineAccess> | undefined;

function useAccessFun() {
  const [state, setState] = useState<IAccessState>();

  return {
    // @ts-ignore
    ...state,
    setState,
  };
}

const useAccess = createModel(useAccessFun);

export default useAccess;
