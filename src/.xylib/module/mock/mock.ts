import type { IDefineMock } from '@xylib/utils/mock';
import Mock from 'mockjs';

Mock.Random.extend({
  phone: function () {
    return Mock.mock(/^[1][3-9][0-9]{9}$/);
  },
});

function ctxRequire(ctx: __WebpackModuleApi.RequireContext) {
  ctx.keys().forEach((key) => {
    const ctxDefault: IDefineMock | IDefineMock[] = ctx(key).default;
    if (ctxDefault) {
      let currentMockInfoList: IDefineMock[] =
        ctxDefault instanceof Array ? ctxDefault : [ctxDefault];
      currentMockInfoList.forEach((currentMock) => {
        if (currentMock?.type === 'xymm-mock' && currentMock?.createMock) {
          currentMock.createMock();
        }
      });
    }
  });
}

/**
 * @description 统一引入 src/mock 下的 mock 模块
 */
function xymmImportMock() {
  const ctx = require.context('@', true, /\.mock.(js|ts)$/);
  ctxRequire(ctx);
}

xymmImportMock();
