// 路由渲染组件
export { default as RouterRender } from './components/RouterRender';

// 初始化创建应用
export { default as createApp } from './utils/createApp';

// 声明一个 mock 功能块
export { defineMock } from './utils/mock';

// 创建一个 rematch 模块
export { createModel } from './utils/store';

// 初始化数据 hook
export { default as useInitialState } from './hooks/useInitialState';

// 根据路由生成的菜单数据 hook
export { default as useMenuData } from './hooks/useMenuData';

// access 权限 hook
export { default as useAccess } from './hooks/useAccess';

// 权限组件
export { default as Access } from './components/Access';
