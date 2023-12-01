"use client";
import { useAdminAuth } from "@hooks/useAdminAuth";
import { useEagerConnect, useWalletListener } from "@lib/web3/hooks";
import React from "react";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  useEagerConnect();
  useWalletListener();
  useAdminAuth();

  return <div style={{ minHeight: "100vh" }}>{children}</div>;
};

export default Layout;
