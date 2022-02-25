import React from 'react';

import type { RouteComponentProps } from 'react-router';
import { IAccessState } from '@xylib/hooks/useAccess';
import Exception403 from '../components/Exception403';

import { Redirect, Route } from 'react-router-dom';
import lazyLoad from './lazyLoad';
import hasAccess, { hasCodeAccess } from './hasAccess';

type IRouterConfigList = XyLib.IRouterConfig[];

function renderItem(params: {
  current: XyLib.IRouterConfig;
  accessFlag: boolean;
  currentIndex: number;
  parentInfo: XyLib.IRouterConfig;
}) {
  const { current, accessFlag, currentIndex, parentInfo } = params;
  const noPathKey = parentInfo ? `${parentInfo.path}-${currentIndex}` : currentIndex;
  if (current.redirect) {
    if (!accessFlag) {
      // 无当前重定向路由权限
      return null;
    }
    return (
      // @ts-ignore 重定向路由
      <Redirect {...current.props} key={noPathKey} />
    );
  }
  const { component: itemComponent } = current;
  if (!itemComponent) {
    // 无路由组件
    return null;
  }
  const isLazy = [true, undefined].includes(current.lazy);
  const { path: itemPath, title: itemTitle } = current;
  if (itemPath) {
    if (!accessFlag) {
      return (
        <Route
          path={itemPath}
          exact={current.exact}
          component={Exception403}
          key={itemPath instanceof Array ? itemPath[0] : itemPath}
        />
      );
    }

    const lazyComponent = (routerProps: RouteComponentProps) => {
      if (typeof itemTitle === 'string') {
        document.title = itemTitle;
      }
      if (itemPath instanceof Array && itemTitle instanceof Array) {
        const { pathname } = routerProps.location;
        const index = itemPath.findIndex((pathItem) => pathItem === pathname);
        const title = itemTitle[index] ?? itemTitle[0];
        document.title = title;
      }
      return lazyLoad(itemComponent, {
        props: {
          ...routerProps,
          ...current.props,
        },
      });
    };

    return (
      <Route
        path={itemPath}
        exact={current.exact}
        // @ts-ignore
        component={isLazy ? lazyComponent : itemComponent}
        key={itemPath instanceof Array ? itemPath[0] : itemPath}
      />
    );
  }
  if (itemPath === undefined && itemComponent) {
    return (
      <Route
        path="*"
        // @ts-ignore
        component={
          isLazy
            ? (routerProps: RouteComponentProps) => {
                if (itemTitle) {
                  document.title = itemTitle as string;
                }
                return lazyLoad(itemComponent, {
                  props: {
                    ...routerProps,
                    ...current.props,
                  },
                });
              }
            : itemComponent
        }
        key={noPathKey}
      />
    );
  }
  return null;
}

function renderRoute(
  config: XyLib.IRouterConfig[],
  options: {
    accessInfo?: IAccessState;
  },
) {
  const { accessInfo } = options;

  // return config.map((item, index) => {
  //   const accessFlag =
  //     hasAccess(item?.access, accessInfo) &&
  //     hasCodeAccess(item.code, accessInfo);
  //   return renderItem({
  //     current: item,
  //     accessFlag,
  //     currentIndex: index,
  //   });
  // });

  const returnList: IRouterConfigList = [];
  function mapData(
    data: IRouterConfigList,
    list: IRouterConfigList,
    options: {
      parentAccessFlag?: boolean;
      parentInfo?: XyLib.IRouterConfig;
    } = {},
  ) {
    const { parentAccessFlag = true, parentInfo } = options;
    if (data?.length > 0) {
      data.forEach((item, index) => {
        const accessFlag =
          hasAccess(item?.access, accessInfo) && hasCodeAccess(item?.code, accessInfo);
        list.push(
          renderItem({
            current: item,
            accessFlag: parentAccessFlag && accessFlag,
            currentIndex: index,
            parentInfo,
          }),
        );
        const itemChildren = item.children;
        if (itemChildren?.length > 0) {
          mapData(itemChildren, list, {
            parentAccessFlag: accessFlag,
            parentInfo: item,
          });
        }
        return;
      });
    }
  }
  mapData(config, returnList);

  return returnList;
}

export default renderRoute;
