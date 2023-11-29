"use client";
import { Network } from "../types";

export const SUPPORTED_NETWORKS: { [key: string]: Network } = {
  [process.env.NEXT_PUBLIC_CHAIN_ID as string]: {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    chainIdHex: process.env.NEXT_PUBLIC_CHAIN_ID_HEX as string,
    chainName: process.env.NEXT_PUBLIC_NETWORK_NAME as string,
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL as string],
    rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL as string],
  },
};
