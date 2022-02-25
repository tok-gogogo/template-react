import React from 'react';

import { RouteComponentProps } from 'react-router';

import { Button, Result } from 'antd';

type IProps = RouteComponentProps;

const Exception403: React.FC<IProps> = ({ history }) => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你无权访问该页面"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
};

export default Exception403;
