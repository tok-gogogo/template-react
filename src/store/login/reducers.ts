import { IState } from './declaration';

const reducers = {
  /**
   * @description 设置登录状态
   */
  setLoginStatus(state: IState, payload: 0 | 1) {
    state.loginStatus = payload;
    return state;
  },
};

export default reducers;
