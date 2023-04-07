import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import CreateIntentModal from "../modals/createIntentsForm";
import IntentsTable from "../tables/intentsTable";
import DataTable from "../dataTable";
const { Header, Sider, Content } = Layout;

export default function NavigationBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Create Project",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Manage NPCs",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        {/* <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          Content
        </Content> */}
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {/* <CustomTable /> */}
          <CreateIntentModal />
          <IntentsTable />
          <DataTable />
        </Content>
      </Layout>
    </Layout>
  );
}
