import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { RematchStore } from '@rematch/core';

import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { RouterRender } from '@xylib';
import HiddenComponent from '../components/HiddenComponent';
import { Provider } from 'react-redux';

import zhCN from 'antd/es/locale/zh_CN';
import app from '@xylib/module/app/app';
import useInitialState from '@xylib/hooks/useInitialState';
import useAccess from '@xylib/hooks/useAccess';

type ICreateAppConfig = {
  /** 路由 */
  history?: {
    /**
     * @description 路由类型
     * @default 'history'
     */
    type?: 'history' | 'hash';
    /** 路由 basename */
    basename?: string;
  };
  /** 路由配置 */
  routerConfig: XyLib.IRouterConfig[];
  /** layout 布局组件，layout 路由会通过 children 的形式传递给该组件 */
  layout?: React.FC<any> | React.Component<any, any, any>;
  /** layout 路由配置 */
  layoutRouterConfig?: XyLib.IRouterConfig[];
  /** rematch store */
  store?: RematchStore;
  /** 项目初始化方法 */
  onAppInit?: () => Promise<boolean> | void;
};

const initSpinStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const loadingDom: React.ReactElement = (
  <div style={initSpinStyle}>
    <Spin />
  </div>
);

const rootDom = document.getElementById('root');

const App: React.FC<Omit<ICreateAppConfig, 'onAppInit'>> = (props) => {
  const initialState = useInitialState();
  const { setState: setAccessState } = useAccess();
  const { routerConfig, layout, layoutRouterConfig, store, history } = props;
  const [loading, setLoading] = useState<boolean>(Boolean(app.defineInitState));

  useEffect(() => {
    (async () => {
      const initState = await app?.defineInitState?.();
      initialState.setState(initState);
      const accessState = app?.defineAccess?.(initState);
      setAccessState(accessState);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      // 初始化完成后，当数据再次发生改变时，重新定义权限
      const { setState, ...initState } = initialState || {};
      const accessState = app?.defineAccess?.(initState);
      setAccessState(accessState);
    }
  }, [initialState]);

  if (loading) {
    return loadingDom;
  }

  const routeList = (
    <>
      <HiddenComponent />
      <RouterRender
        routerConfig={routerConfig}
        layout={layout}
        layoutRouterConfig={layoutRouterConfig}
      />
    </>
  );

  const router =
    history?.type === 'hash' ? (
      <HashRouter basename={history?.basename}>{routeList}</HashRouter>
    ) : (
      <BrowserRouter basename={history?.basename}>{routeList}</BrowserRouter>
    );

  return (
    <ConfigProvider locale={zhCN}>
      {store ? <Provider store={store}>{router}</Provider> : router}
    </ConfigProvider>
  );
};

async function createApp(config: ICreateAppConfig) {
  const { history, routerConfig, layout, layoutRouterConfig, store, onAppInit } = config;

  if (onAppInit) {
    ReactDOM.render(loadingDom, rootDom);
    await onAppInit();
  }

  ReactDOM.render(
    <App
      routerConfig={routerConfig}
      layout={layout}
      layoutRouterConfig={layoutRouterConfig}
      store={store}
      history={history}
    />,
    rootDom,
  );
}

export default createApp;
