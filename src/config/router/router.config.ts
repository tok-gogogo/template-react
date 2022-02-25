import routerTree from './router-tree';

const layoutRouterConfig: XyLib.IRouterConfig[] = [
  {
    path: routerTree.welcome,
    title: '欢迎',
    exact: true,
    component: () => import(/* webpackChunkName: "welcome" */ '@/views/Welcome'),
  },
  {
    path: routerTree.list.path,
    title: '列表页',
    exact: true,
    children: [
      {
        path: routerTree.list.search,
        title: '搜索列表',
        exact: true,
        component: () => import(/* webpackChunkName: "search-list" */ '@/views/List/SearchList'),
      },
    ],
  },
  {
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound'),
  },
];

export default layoutRouterConfig;
