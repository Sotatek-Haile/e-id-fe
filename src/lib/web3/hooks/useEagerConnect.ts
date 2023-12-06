"use client";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { metaMask } from "../connectors/metamask";

/**
 * Trying eager connect to connectors at first time.
 * @returns `tried` tried eager connect done or not
 */
export function useEagerConnect() {
  const [tried, setTried] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false);
  const { isActive } = useWeb3React();

  useEffect(() => {
    if (!window.ethereum) {
      setNoMetamask(true);
    }
    if (!isActive) {
      (window.ethereum as any)?._metamask.isUnlocked().then(async (isUnlock: any) => {
        if (isUnlock) {
          await metaMask.connectEagerly();
        }
        setTried(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return { noMetamask, tried };
}
