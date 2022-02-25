import React from 'react';

import { RouteComponentProps } from 'react-router';

import { Button, Result } from 'antd';
import routerTree from '@/config/router/router-tree';

type IProps = RouteComponentProps;

const NotFound: React.FC<IProps> = ({ history }) => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => history.push(routerTree.welcome)}>
          返回首页
        </Button>
      }
    />
  );
};

export default NotFound;
