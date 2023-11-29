import { ethers } from "ethers";

export const signMessage = async (
  signer: ethers.providers.JsonRpcSigner,
  message: string
): Promise<string> => {
  return signer?.signMessage(message);
};
