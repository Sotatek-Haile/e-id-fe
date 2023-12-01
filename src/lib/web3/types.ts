export type Network = {
  chainId: number;
  chainIdHex: string;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: { name: string; decimals: number; symbol: string };
  blockExplorerUrls: string[];
};

export enum Gender {
  Male = 0,
  Female = 1,
}

export type User = {
  name: string;
  gender: Gender;
  age: number;
  score: number;
  sensitiveInformation: string;
};
