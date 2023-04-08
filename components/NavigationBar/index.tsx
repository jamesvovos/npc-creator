import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import Intents from "@/pages/Intents";
import CreateProject from "@/pages/CreateProject";
import DataTable from "../dataTable";
const { Header, Sider, Content } = Layout;

export default function NavigationBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedContent, setSelectedContent] = useState("Dashboard");

  const handleMenuItemClick = (content: any) => {
    setSelectedContent(content);
  };

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => handleMenuItemClick(e.key)}
          items={[
            {
              key: "Dashboard",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "CreateProject",
              icon: <VideoCameraOutlined />,
              label: "Create Project",
            },
            {
              key: "ManageNPCs",
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
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            backgroundColor: "#f7f7f7",
          }}
        >
          <div>
            {selectedContent === "Dashboard" && <Intents />}
            {selectedContent === "Dashboard" && <DataTable />}
            {selectedContent === "CreateProject" && <CreateProject />}
            {selectedContent === "ManageNPCs" && <p>Manage NPCs content</p>}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
