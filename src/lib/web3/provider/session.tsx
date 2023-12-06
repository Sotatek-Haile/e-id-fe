/* eslint-disable @next/next/no-img-element */
"use client";
import { getAccount } from "@app/_stores/user/selectors";
import { useEagerConnect, useWalletListener } from "@lib/web3/hooks";
import { Result, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";
const W3Session = ({ children }: React.PropsWithChildren & any) => {
  useWalletListener();
  const router = useRouter();
  const address = useSelector(getAccount) as string;
  useEffect(() => {
    if (!address) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  const { tried, noMetamask } = useEagerConnect();
  if (!!noMetamask)
    return (
      <Result
        icon={
          <div className="flex justify-center items-center">
            <img
              alt="oke"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Greater_coat_of_arms_of_the_United_States.svg/220px-Greater_coat_of_arms_of_the_United_States.svg.png"
            />
          </div>
        }
        title={
          <div>
            <b>E-ID Notification</b>
            <p>Please install Metamask on the Chrome web store!</p>
          </div>
        }
      />
    );
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
