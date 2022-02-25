import React, { useState, useEffect } from 'react';

import { IRouterConfig } from '@xylib/declaration/global.d';
import { RouteComponentProps } from 'react-router';

import { Switch, Route, Redirect } from 'react-router-dom';
import lazyLoad from './lazyLoad';
import mapDataGetList from '@xylib/components/RouterRender/utils/mapDataGetList';

type IRouterConfigList = IRouterConfig[];

type IProps = {
  config: IRouterConfigList;
};

const Router: React.FC<IProps> = (props) => {
  const { config } = props;
  const [routerList, setRouterList] = useState<IRouterConfigList>([]);

  useEffect(() => {
    setRouterList(mapDataGetList(config));
  }, [config]);

  return routerList.length > 0 ? (
    <Switch>
      {routerList.map((item, index) => {
        if (item.redirect) {
          // @ts-ignore 重定向路由
          return <Redirect {...item.props} key={index} />;
        }
        if (!item.component) {
          // 无路由组件
          return null;
        }
        if (item.path instanceof Array) {
          return item.path.map((pathItem, pathIndex) => (
            <Route
              path={pathItem}
              exact={item.exact}
              // @ts-ignore
              component={
                [true, undefined].includes(item.lazy)
                  ? (routerProps: RouteComponentProps) => {
                      const itemTitle = item.title;

                      if (itemTitle instanceof Array) {
                        document.title = itemTitle[pathIndex] ?? itemTitle[0];
                      }
                      if (typeof itemTitle === 'string') {
                        document.title = itemTitle;
                      }

                      return lazyLoad(item.component, {
                        props: {
                          ...routerProps,
                          ...item.props,
                        },
                      });
                    }
                  : item.component
              }
              key={pathItem}
            />
          ));
        }
        if (typeof item.path === 'string') {
          return (
            <Route
              path={item.path}
              exact={item.exact}
              // @ts-ignore
              component={
                [true, undefined].includes(item.lazy)
                  ? (routerProps: RouteComponentProps) => {
                      if (item.title) {
                        document.title = item.title as string;
                      }
                      return lazyLoad(item.component, {
                        props: {
                          ...routerProps,
                          ...item.props,
                        },
                      });
                    }
                  : item.component
              }
              key={item.path}
            />
          );
        }
        return null;
      })}
    </Switch>
  ) : null;
};

export default Router;
