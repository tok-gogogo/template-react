import routerTree from './router-tree';

const topRouterConfig: XyLib.IRouterConfig[] = [
  {
    path: routerTree.login,
    title: '登录',
    exact: true,
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
    hideInMenu: true,
  },
  {
    redirect: true,
    props: {
      exact: true,
      from: '/',
      to: routerTree.welcome,
    },
  },
];

export default topRouterConfig;
