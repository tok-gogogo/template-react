import { defineMock } from '@xylib';

export default defineMock({
  url: '/api/currentUser',
  template: {
    status: 200,
    msg: '成功',
    data: {
      id: '@id',
      name: 'admin',
    },
  },
});
