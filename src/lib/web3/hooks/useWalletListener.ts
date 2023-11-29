import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef } from "react";
import { useConnectWallet } from "./useConnectWallet";
// import { useHistory } from 'react-router-dom';
// import { PATHS } from 'src/constants/paths';

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */

export function useWalletListener() {
  const { connector, account, chainId } = useWeb3React();
  const { disconnectWallet } = useConnectWallet();

  const accountRef = useRef<string>();

  const handleLogout = (accounts: string[], removeCache = true) => {
    if (accounts[0] !== accountRef.current) {
      disconnectWallet(removeCache);
    }
    accountRef.current = accounts[0];
  };

  const handleChainChange = (chainHex: string) => {
    disconnectWallet(true);
  };

  useEffect(() => {
    if (account && connector && connector.provider) {
      connector.provider?.on("chainChanged", handleChainChange);
      connector.provider?.on("accountsChanged", handleLogout);
    } else {
      connector.provider?.removeListener("chainChanged", handleChainChange);
      connector.provider?.removeListener("accountsChanged", handleLogout);
    }

    if (window) {
      (window as any).logout = handleLogout;
    }

    return () => {
      connector.provider?.removeListener("chainChanged", handleChainChange);
      connector.provider?.removeListener("accountsChanged", handleLogout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector.provider, account]);
}
