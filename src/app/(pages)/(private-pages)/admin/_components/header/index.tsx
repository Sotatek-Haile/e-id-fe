"use client";
import { Dropdown, Layout } from "antd";
const { Header } = Layout;
import "./styles.scss";
import { useWeb3React } from "@web3-react/core";
import Avatar from "@app/_components/Avatar";
import { ellipseAddress } from "@helpers";

const HeaderApp = () => {
  const { account } = useWeb3React();
  return (
    <Header className="head-wrap">
      <div className="header-action">
        <Avatar fontSize={40} address={account} />
        <div className="auth-logged">{ellipseAddress(account)}</div>
      </div>
    </Header>
  );
};

export default HeaderApp;
