import React from 'react';

import { RouteComponentProps } from 'react-router';

import { Dropdown, Layout, Menu } from 'antd';
import routerTree from '@/config/router/router-tree';
import { useMenuData } from '@xylib';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const { menuData, selectedKeys, openKeys, setState } = useMenuData();

  function onDropDownMenuClick(key: string) {
    if (key === 'logout') {
      // 退出登录
      history.push(routerTree.login);
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div
          style={{
            margin: 16,
            lineHeight: '32px',
            background: 'rgba(255, 255, 255, .3)',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          app-ts-test
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={(openKeys) => setState({ openKeys })}
          mode="inline"
          onClick={({ key }) => history.push(key)}
        >
          {menuData.map((item) =>
            item.children?.length ? (
              <Menu.SubMenu key={item.path} title={item.title}>
                {item.children.map((child) => (
                  <Menu.Item key={child.path}>{child.title}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.path}>{item.title}</Menu.Item>
            ),
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff' }}>
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => onDropDownMenuClick(key)}>
                <Menu.Item key="logout">退出登录</Menu.Item>
              </Menu>
            }
          >
            <div style={{ float: 'right', cursor: 'pointer', padding: '0 12px' }}>admin</div>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24 }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
