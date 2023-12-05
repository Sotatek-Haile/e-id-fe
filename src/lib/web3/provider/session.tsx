"use client";
import { getAccount } from "@app/_stores/user/selectors";
import { useEagerConnect, useWalletListener } from "@lib/web3/hooks";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const W3Session = ({ children }: React.PropsWithChildren & any) => {
  useWalletListener();
  const router = useRouter();
  const address = useSelector(getAccount) as string;
  useEffect(() => {
    if (!address) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  const tried = useEagerConnect();

  if (tried) return children;
  return (
    <div
      style={{
        marginTop: "50vh",
      }}
    >
      <Spin tip="Loading ..." size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default W3Session;
