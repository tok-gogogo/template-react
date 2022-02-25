import React, { useEffect, useState } from 'react';

import type { RouteComponentProps } from 'react-router';
import type { ICurrentUser } from '@/services/user';
import { APIStatusEnum } from '@/declaration/service';

import api from '@/services';
import { Button, Space } from 'antd';
import { Access } from '@xylib';

type IProps = RouteComponentProps;

const Welcome: React.FC<IProps> = () => {
  const [userInfo, setUserInfo] = useState<ICurrentUser>();

  useEffect(() => {
    api.user.getCurrentUserInfo().then((res) => {
      if (res.status === APIStatusEnum.SUCCESS) {
        setUserInfo(res.data);
      }
    });
  }, []);

  return (
    <>
      <p>欢迎访问，{userInfo?.name}</p>
      <Space direction="vertical">
        <Access code="welcomeCreate">
          <Button>一个权限 code 为 welcomeCreate 的按钮</Button>
        </Access>
        <Access accessible={(access) => access.isAdmin}>
          <Button>一个管理员才能看到的按钮</Button>
        </Access>
        <Access code="someAccessCode" fallback={<Button disabled>一个没有权限时禁用的按钮</Button>}>
          <Button>一个没有权限时禁用的按钮</Button>
        </Access>
      </Space>
    </>
  );
};

export default Welcome;
