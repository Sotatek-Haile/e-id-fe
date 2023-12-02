"use client";
import { useEagerConnect, useWalletListener } from "@lib/web3/hooks";
import React from "react";

const RootLayout = ({ children }: React.PropsWithChildren & any) => {
  useWalletListener();
  const tried = useEagerConnect();
  return <div>{tried ? <>{children}</> : <div>Loading...</div>}</div>;
};

export default RootLayout;
