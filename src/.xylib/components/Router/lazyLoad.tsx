import React, { ComponentType } from 'react';
import { Spin } from 'antd';

export type IImportFun = () => Promise<{ default: ComponentType<any> }>;

const PageLoading = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin />
    </div>
  );
};

/**
 * @description 懒加载
 */
const lazyLoad = (
  component: IImportFun,
  params: {
    props: any;
  },
) => {
  const { props } = params;

  const Component = React.lazy(component);

  return (
    <React.Suspense fallback={<PageLoading />}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default lazyLoad;
