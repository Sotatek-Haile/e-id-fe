"use client";
import { PATHS } from "@app/_constants/path";
import { useConnectWallet } from "@lib/web3/hooks/useConnectWallet";
import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import HeaderApp from "../header";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { removeUser } from "@app/_stores/user";

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface ILayout {
  children: React.ReactNode;
}

const AdminLayout: React.FC<ILayout> = ({ children }) => {
  const { disconnectWallet } = useConnectWallet();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const items: MenuItem[] = [
    getItem("Persons", PATHS.PersonManagement()),
    getItem("Organizations", PATHS.OrganizationManagement()),
    getItem("Home", PATHS.home()),
  ];

  const onLogout = () => {
    dispatch(removeUser());
    disconnectWallet();
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider width={250} className="awayday-sidebar-wrap" theme="light">
        <div className="sidebar-head">
          <img
            height={80}
            width={80}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Greater_coat_of_arms_of_the_United_States.svg/220px-Greater_coat_of_arms_of_the_United_States.svg.png"
            }
          />
        </div>
        <Menu
          className="sidebar-menu"
          theme="light"
          defaultSelectedKeys={[pathName ?? PATHS.PersonManagement()]}
          mode="inline"
          forceSubMenuRender={true}
          items={items}
          onSelect={({ key }) => {
            router.push(key);
          }}
        />
        <div className="other-action">
          <div className="other-action-menu"></div>
          <Button onClick={onLogout} className="other-action-btn">
            Log Out
          </Button>
        </div>
      </Sider>
      <Layout className="awayday-layout">
        <HeaderApp />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
