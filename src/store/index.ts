import { init, RematchRootState, RematchDispatch } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import loadingPlugin from '@rematch/loading';

import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch } from 'react-redux';
import * as models from './models';

export { connect } from 'react-redux';

const immer = immerPlugin();
const loading = loadingPlugin({});

const store = init({
  plugins: [immer, loading],

  models,
});

export type IStore = typeof store;

export type IRootState = RematchRootState<typeof models>;

export type IRootDispatch = RematchDispatch<typeof models>;

export function useSelector<ISelected = unknown>(
  selector: (state: IRootState) => ISelected,
  equalityFn?: (left: ISelected, right: ISelected) => boolean,
): ISelected {
  return reduxUseSelector(selector, equalityFn);
}

export function useDispatch() {
  return reduxUseDispatch<IRootDispatch>();
}

export default store;
