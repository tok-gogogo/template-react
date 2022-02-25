import React, { useEffect, useMemo } from 'react';

import { Route, Switch } from 'react-router-dom';
import renderRoute from './utils/renderRoute';
import mapRouterGetMenu from './utils/mapRouterGetMenu';

import useMenuData from '@xylib/hooks/useMenuData';
import useAccess from '@xylib/hooks/useAccess';

type IRouterConfigList = XyLib.IRouterConfig[];

type IProps = {
  /** 路由配置 */
  routerConfig: IRouterConfigList;
  /** layout 布局组件，layout 路由会通过 children 的形式传递给该组件 */
  layout?: React.FC<any> | React.Component<any, any, any>;
  /** layout 路由配置 */
  layoutRouterConfig?: XyLib.IRouterConfig[];
};

const RouterRender: React.FC<IProps> = (props) => {
  const { routerConfig, layout: MainLayout, layoutRouterConfig } = props;
  const { setState } = useMenuData((model) => [model.setState]);
  const accessInfo = useAccess();

  // 根据路由配置生成菜单数据
  useEffect(() => {
    const menuData = mapRouterGetMenu(routerConfig, {
      accessInfo,
    });
    const layoutMenuData = mapRouterGetMenu(layoutRouterConfig, {
      accessInfo,
    });
    const routeData = mapRouterGetMenu(routerConfig, {
      accessInfo,
      useConfig: false,
    });
    const layoutRouteData = mapRouterGetMenu(layoutRouterConfig, {
      accessInfo,
      useConfig: false,
    });
    setState({
      menuData: menuData.concat(layoutMenuData),
      routeData: routeData.concat(layoutRouteData),
    });
  }, [routerConfig, layoutRouterConfig, accessInfo]);

  const layoutRouterNode = useMemo(() => {
    return layoutRouterConfig?.length > 0 ? (
      <Switch>
        {renderRoute(layoutRouterConfig || [], {
          accessInfo,
        })}
      </Switch>
    ) : null;
  }, [layoutRouterConfig, accessInfo]);

  const routerNodes = useMemo(() => {
    return routerConfig?.length ? (
      <Switch>
        {renderRoute(routerConfig, {
          accessInfo,
        })}
        <Route
          path="/"
          render={(props) => (
            // @ts-ignore
            <MainLayout {...props}>{layoutRouterNode}</MainLayout>
          )}
        />
      </Switch>
    ) : null;
  }, [routerConfig, accessInfo, layoutRouterNode]);

  return routerNodes;
};

export default RouterRender;
