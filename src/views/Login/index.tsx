import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router';

import { Form, Input, Button, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import routerTree from '@/config/router/router-tree';
import { useDispatch, useSelector } from '@/store';

type IProps = RouteComponentProps;

/**
 * @description 表单数据声明
 */
type IFormValues = {
  /** 账号 */
  account: string;
  /** 密码 */
  password: string;
};

const Login: React.FC<IProps> = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const { loginStatus } = useSelector((state) => ({
    loginStatus: state.login.loginStatus,
  }));

  const dispatch = useDispatch();

  const onFinish = (values: IFormValues) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`登录成功，账号为：${values.account}`);
      setLoading(false);
      history.push(routerTree.welcome);
    }, 1200);
  };

  return (
    <Form<IFormValues>
      initialValues={{
        account: 'admin',
        password: '123456',
      }}
      onFinish={onFinish}
      style={{ margin: '0 auto', paddingTop: 200, maxWidth: 300 }}
    >
      <Form.Item name="account" rules={[{ required: true, message: '请输入账号' }]}>
        <Input prefix={<UserOutlined style={{ color: '#1890ff' }} />} placeholder="账号" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input
          prefix={<LockOutlined style={{ color: '#1890ff' }} />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          登录
        </Button>
      </Form.Item>
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        <span>rematch 中的 loginStatus: {loginStatus}</span>
        <Button onClick={() => dispatch.login.setLoginStatus(loginStatus === 0 ? 1 : 0)}>
          修改 rematch 中的 loginStatus
        </Button>
      </Space>
    </Form>
  );
};

export default Login;
