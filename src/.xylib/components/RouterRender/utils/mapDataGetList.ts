type IRouterConfigList = XyLib.IRouterConfig[];

// 扁平化路由配置
const mapDataGetList = (routerData: IRouterConfigList) => {
  const returnList: IRouterConfigList = [];
  function mapData(data: IRouterConfigList, list: IRouterConfigList) {
    if (data?.length > 0) {
      data.forEach((item) => {
        list.push(item);
        const itemChildren = item.children;
        if (itemChildren?.length > 0) {
          mapData(itemChildren, list);
        }
        return;
      });
    }
  }
  mapData(routerData, returnList);

  return returnList;
};

export default mapDataGetList;
