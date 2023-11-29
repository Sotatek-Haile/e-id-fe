import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { metaMask } from "../connectors/metamask";

/**
 * Trying eager connect to connectors at first time.
 * @returns `tried` tried eager connect done or not
 */
export function useEagerConnect() {
  const { isActive } = useWeb3React();

  useEffect(() => {
    if (!isActive) {
      (window.ethereum as any)?._metamask.isUnlocked().then((isUnlock: any) => {
        if (isUnlock) {
          metaMask.connectEagerly().then(() => {});
        } else {
        }
      });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
