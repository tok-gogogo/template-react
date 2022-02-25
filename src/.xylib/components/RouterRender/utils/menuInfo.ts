import { IXyMenuDataItem } from '@xylib/hooks/useMenuData';

export function formatUrl(url: string): string {
  if (!url) {
    return '';
  }
  return url[0] === '/' ? url : `/${url}`;
}

export function findUrlPath({
  data,
  func,
  path = [],
}: {
  data: IXyMenuDataItem[];
  func: any;
  path?: string[];
}) {
  if (!data) return [];
  for (const item of data) {
    path.push(formatUrl(item.path));
    const itemChildren = item.children;
    if (func(item) && itemChildren?.length) return path;
    if (itemChildren?.length) {
      const findChildren = findUrlPath({
        data: itemChildren,
        func,
        path,
      });
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}

const treeFindPath = ({
  data,
  func,
  result = [],
}: {
  data: IXyMenuDataItem[];
  func: (info: IXyMenuDataItem) => boolean;
  result?: IXyMenuDataItem[];
}) => {
  if (!data) return [];
  for (const item of data) {
    // 这里按照你的需求来存放最后返回的内容吧
    result.push(item);
    if (func(item)) return result;
    const itemChildren = item.children;
    if (itemChildren) {
      const findChildren = treeFindPath({
        data: itemChildren,
        func,
        result,
      });
      if (findChildren.length) return findChildren;
    }
    result.pop();
  }
  return [];
};

// 查询高亮的菜单
export const findHightMenu = ({
  data,
  currentPathname,
  currentSearch,
}: {
  data: IXyMenuDataItem[];
  currentPathname: string;
  currentSearch: string;
}) => {
  let returnPath = [];
  let localCurrent = formatUrl(currentPathname);
  const func = (item: IXyMenuDataItem) => formatUrl(item?.path?.split('?')[0]) === localCurrent;
  let time = 10;
  while (returnPath.length === 0 && time > 0) {
    returnPath = treeFindPath({
      data,
      func,
    });
    localCurrent = localCurrent.slice(
      0,
      localCurrent.lastIndexOf('/') > 0 ? localCurrent.lastIndexOf('/') : 0,
    );
    time--;
  }
  if ((!returnPath || (returnPath && returnPath.length === 0)) && currentSearch) {
    localCurrent = currentPathname + currentSearch;
    while (returnPath.length === 0 && time > 0) {
      returnPath = treeFindPath({
        data,
        func,
      });
      localCurrent = localCurrent.slice(
        0,
        localCurrent.lastIndexOf('/') > 0 ? localCurrent.lastIndexOf('/') : 0,
      );
      time--;
      if (localCurrent.match(/\//gi) && localCurrent.match(/\//gi).length <= 1) {
        break;
      }
    }
  }
  return returnPath;
};
