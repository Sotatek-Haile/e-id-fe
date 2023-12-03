"use client";
import Loading from "@app/_components/Loading";
import { useEagerConnect, useWalletListener } from "@lib/web3/hooks";
import React from "react";

const RootLayout = ({ children }: React.PropsWithChildren & any) => {
  useWalletListener();
  const tried = useEagerConnect();
  return <div>{tried ? <>{children}</> : <Loading />}</div>;
};

export default RootLayout;
