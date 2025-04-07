"use client";

import { ReactNode, useState } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import SidebarContainer from "@/components/(adminDashboard)/layout/SidebarContainer";
import HeaderContainer from "@/components/(adminDashboard)/layout/HeaderContainer";

const { Content } = Layout;

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBorder: "var(--color-main)",
          },
          Form: {
            labelFontSize: 18,
          },
          DatePicker: {
            colorBorder: "rgb(184,114,174)",
          },
        },
      }}
    >
      <Layout style={{ height: "100vh", overflow: "auto" }} hasSider>
        <SidebarContainer collapsed={collapsed}></SidebarContainer>
        <Layout>
          <HeaderContainer
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          ></HeaderContainer>
          <Content
            style={{
              padding: 27,
              minHeight: 280,
              background: "var(--color-main-bg)",
              // borderRadius: borderRadiusLG,
              height: "80vh",
              overflow: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
