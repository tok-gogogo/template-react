import Mock from 'mockjs';

type IDefineMockParams = {
  /** 地址 */
  url: string | RegExp;
  /** mock template */
  template: any;
  /** 请求方式 */
  method?: string;
};

export type IDefineMock = {
  type: string;
  createMock: () => void;
};

/**
 * @description 定义一个 mock
 */
export function defineMock(params: IDefineMockParams): IDefineMock {
  return {
    type: 'xymm-mock',
    createMock() {
      Mock.mock(params.url, params.method, params.template);
    },
  };
}
