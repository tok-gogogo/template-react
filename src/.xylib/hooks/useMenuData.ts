import { createModel } from 'hox';
import { useState } from 'react';

export type IXyMenuDataItem = {
  /** 菜单标题 */
  title: string;
  /** 菜单地址 */
  path: string;
  /** 菜单图标 */
  icon?: any;
  /** 子菜单 */
  children?: IXyMenuDataItem[];
};

type IState = {
  routeData: IXyMenuDataItem[];
  menuData: IXyMenuDataItem[];
  openKeys: any[];
  selectedKeys: string[];
  breadcrumb: IXyMenuDataItem[];
};

function useMenuDataFun() {
  const [state, localSetState] = useState<IState>({
    routeData: [],
    menuData: [],
    openKeys: [],
    selectedKeys: [],
    breadcrumb: [],
  });

  function setState(data: Partial<IState>) {
    localSetState({
      ...state,
      ...data,
    });
  }

  return {
    ...state,
    setState,
  };
}

const useMenuData = createModel(useMenuDataFun);

export default useMenuData;
