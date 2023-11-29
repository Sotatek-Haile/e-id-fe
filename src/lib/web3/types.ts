export type Network = {
  chainId: number;
  chainIdHex: string;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: { name: string; decimals: number; symbol: string };
  blockExplorerUrls: string[];
};
