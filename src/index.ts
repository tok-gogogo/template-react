import routerConfig from '@/config/router/top.router';
import MainLayout from '@/components/MainLayout';
import layoutRouterConfig from '@/config/router/router.config';
import store from '@/store';

import { createApp } from '@xylib';

createApp({
  routerConfig,
  layout: MainLayout,
  layoutRouterConfig,
  store,
});

export async function defineInitState() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    currentUser: {
      userId: 1,
      userName: 'admin',
      role: 'admin',
    },
  };
}

export function defineAccess(initialState: any) {
  const { currentUser } = initialState;

  return {
    isAdmin: currentUser.role === 'admin',
    fnCodes: ['welcomeCreate'],
  };
}
