"use client";
import { useEagerConnect, useWalletListener } from "@lib/web3/hooks";
import { Spin } from "antd";
import React from "react";

const W3Session = ({ children }: React.PropsWithChildren & any) => {
  useWalletListener();
  const tried = useEagerConnect();
  if (tried) return children;
  return (
    <div className="mt-[40vh]">
      <Spin tip="Loading ..." size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default W3Session;
