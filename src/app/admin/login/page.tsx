"use client";
import Icon from "@app/_assets/icons/metamask-ic.svg";
import { ConnectorKey } from "@lib/web3/connectors";
import { useConnectWallet } from "@lib/web3/hooks/useConnectWallet";
import { Button } from "antd";
import "./styles.scss";

const Login = () => {
  const { connectWalletAndSignMessage } = useConnectWallet();
  return (
    <div className="login">
      <Button
        onClick={() => {
          connectWalletAndSignMessage(ConnectorKey.metaMask);
        }}
        className="login__btn"
        icon={<Icon />}
      >
        Connect With Metamask
      </Button>
    </div>
  );
};

export default Login;
