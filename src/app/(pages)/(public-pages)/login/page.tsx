"use client";
import Icon from "@app/_assets/icons/metamask-ic.svg";
import { PATHS } from "@app/_constants/path";
import { setUser } from "@app/_stores/user";
import { ConnectorKey } from "@lib/web3/connectors";
import { useConnectWallet } from "@lib/web3/hooks/useConnectWallet";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import "./styles.scss";

const Login = () => {
  const router = useRouter();
  const { connectWalletAndSignMessage } = useConnectWallet();
  const dispatch = useDispatch();

  async function onSignIn() {
    const data: any = await connectWalletAndSignMessage(ConnectorKey.metaMask);
    dispatch(setUser(data));
    return router.push(PATHS.home());
  }
  return (
    <div className="login">
      <Button onClick={onSignIn} className="login__btn" icon={<Icon />}>
        Connect With Metamask
      </Button>
    </div>
  );
};

export default Login;
