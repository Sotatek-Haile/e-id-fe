"use client";
import { useAdminAuth } from "@hooks/useAdminAuth";
import { useEagerConnect, useWalletListener } from "@lib/web3/hooks";
import React from "react";

const RootLayout = ({ children }: React.PropsWithChildren & any) => {
  useWalletListener();
  const tried = useEagerConnect();
  useAdminAuth(tried)
  return <div>{tried ? <>{children}</> : <div>Loading...</div>}</div>;
};

export default RootLayout;
