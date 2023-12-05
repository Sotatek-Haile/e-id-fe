import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { SUPPORTED_NETWORKS } from "../constants/networks";
import { signMessage } from "../helpers";
import { ConnectorKey, connectors } from "../connectors";
import { baseQueryApi } from "@lib/redux/baseQueryApi";
import { useAppDispatch } from "@lib/redux/store";
import { useRouter } from "next/navigation";
import { removeUser } from "@app/_stores/user";
/**
 * Hook for connect/disconnect to a wallet
 * @returns `connectWallet` and `disconnectWallet` functions .
 */
export const useConnectWallet = () => {
  const { connector: appConnector } = useWeb3React();
  const route = useRouter();
  const dispatch = useAppDispatch();
  const getAccountConnected = async (provider: Web3Provider) => {
    const signer = provider.getSigner();
    const account = await signer?.getAddress();
    return account;
  };

  const getSignature = async (provider: Web3Provider) => {
    const message = `${process.env.NEXT_PUBLIC_MESSAGES_SIGN}`;
    const signer = provider?.getSigner();
    const signature = await signMessage(signer, message);
    return {
      message,
      signature,
    };
  };

  async function connectWallet(connectorKey: ConnectorKey) {
    const connector = connectors[connectorKey];
    const chainId = parseInt(
      process.env.NEXT_PUBLIC_CHAIN_ID as string,
      10,
    ) as keyof typeof SUPPORTED_NETWORKS;

    try {
      const objAddNetWork =
        connectorKey === ConnectorKey.metaMask
          ? ({
              chainId: chainId,
              chainName: SUPPORTED_NETWORKS[chainId].chainName,
              nativeCurrency: {
                name: "BNB",
                symbol: "bnb",
                decimals: 18,
              },
              rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
              blockExplorerUrls: SUPPORTED_NETWORKS[chainId].blockExplorerUrls,
            } as any)
          : chainId;
      await connector.activate(objAddNetWork);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  const clearWalletConnect = () => {
    localStorage.clear();
  };

  const connectWalletAndSignMessage = async (connectorKey: ConnectorKey) => {
    const isMetamaskInstalled = window?.ethereum?.isMetaMask;
    if (!isMetamaskInstalled && connectorKey === ConnectorKey.metaMask) {
      const metamaskAppDeepLink = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
      window.open(metamaskAppDeepLink);
      throw new Error("No provider found");
    }

    await connectWallet(connectorKey);
    const connector = connectors[connectorKey];
    if (!connector.provider) {
      throw new Error("No provider found");
    }
    const provider = new Web3Provider(connector?.provider);
    const account = await getAccountConnected(provider);
    if (!account) {
      throw new Error("Account not found");
    }
    const { message, signature } = await getSignature(provider);
    return {
      message,
      signature,
      account,
    };
  };

  function disconnectWallet(removeCache = true) {
    appConnector.resetState();
    appConnector?.deactivate && appConnector.deactivate();
    if (removeCache) {
      dispatch(baseQueryApi.util.resetApiState());
      dispatch(removeUser());
    }
  }

  return { connectWallet, disconnectWallet, connectWalletAndSignMessage };
};
