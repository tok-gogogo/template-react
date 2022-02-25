import React, { useEffect, useState } from 'react';

import { withRouter } from 'react-router-dom';
import { findHightMenu, findUrlPath } from '@xylib/components/RouterRender/utils/menuInfo';
import useMenuData, { IXyMenuDataItem } from '@xylib/hooks/useMenuData';

export default withRouter(({ history }) => {
  const { menuData, routeData, selectedKeys, setState } = useMenuData((model) => [
    model.menuData,
    model.routeData,
    model.setState,
  ]);
  const [init, setInit] = useState<boolean>(true);

  const currentPathname = history.location.pathname;

  function setMenuInfo() {
    const openKeys =
      findUrlPath({
        data: menuData,
        func: (item: IXyMenuDataItem) => {
          return currentPathname.includes(item.path?.split('?')?.[0]);
        },
      }) || [];
    const currentMenuPathInfo =
      findHightMenu({
        data: menuData,
        currentPathname,
        currentSearch: history.location.search,
      }) || [];
    const currentRoutePathInfo =
      findHightMenu({
        data: routeData,
        currentPathname,
        currentSearch: history.location.search,
      }) || [];
    setState({
      openKeys,
      selectedKeys: currentMenuPathInfo.map((item) => item.path),
      breadcrumb: currentRoutePathInfo,
    });
  }

  useEffect(() => {
    if (!menuData?.length || !setInit) {
      return;
    }

    if (!selectedKeys?.length) {
      setTimeout(() => setInit(false), 20);
    } else {
      setMenuInfo();
    }
  }, [menuData, routeData, currentPathname]);

  useEffect(() => {
    if (!init) {
      setMenuInfo();
      setInit(true);
    }
  }, [init, currentPathname]);

  return <></>;
});
