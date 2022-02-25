import { IXyMenuDataItem } from '@xylib/hooks/useMenuData';
import { IAccessState } from '@xylib/hooks/useAccess';
import hasAccess, { hasCodeAccess } from './hasAccess';

type IRouterConfigList = XyLib.IRouterConfig[];

export default function mapRouterGetMenu(
  routerData: IRouterConfigList,
  options: {
    accessInfo?: IAccessState;
    useConfig?: boolean;
  },
): IXyMenuDataItem[] {
  const { accessInfo, useConfig = true } = options;

  function routerToMenu(
    data: XyLib.IRouterConfig,
    children?: IXyMenuDataItem[],
  ): IXyMenuDataItem[] {
    const { path, title, icon } = data;
    if (path instanceof Array) {
      return path.map((pathItem, pathIndex) => ({
        path: pathItem,
        title: title instanceof Array ? title[pathIndex] || title[0] : title,
        icon,
        children,
      }));
    }
    return [
      {
        path: path,
        title: title instanceof Array ? title[0] : title,
        icon,
        children,
      },
    ];
  }

  const list = routerData
    .map((router) => {
      if (!router.path || !router.title || (router.hideInMenu && useConfig)) {
        return null;
      }
      const accessFlag =
        hasAccess(router.access, accessInfo) && hasCodeAccess(router.code, accessInfo);
      if (!accessFlag && useConfig) {
        return null;
      }
      let children: IXyMenuDataItem[] = [];
      if (router.children?.length && (!router.hideChildrenInMenu || !useConfig)) {
        children = mapRouterGetMenu(router.children, {
          accessInfo: options?.accessInfo,
        });
      }
      return routerToMenu(router, children);
    })
    .filter(Boolean);

  return list?.length ? list.reduce((a, b) => a.concat(b)) : [];
}
