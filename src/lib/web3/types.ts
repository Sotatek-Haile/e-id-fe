export type Network = {
  chainId: number;
  chainIdHex: string;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: { name: string; decimals: number; symbol: string };
  blockExplorerUrls: string[];
};

export enum Gender {
  Male = 1,
  Female = 2,
}

export type User = {
  name: string;
  gender: Gender;
  age: number;
  score: number;
  sensitiveInformation: string;
};

export type Organization = {
  name: string;
  tax: string;
  tokenId?: string;
};
export const GENDER = {
  [Gender.Female]: "Female",
  [Gender.Male]: "Male",
};
