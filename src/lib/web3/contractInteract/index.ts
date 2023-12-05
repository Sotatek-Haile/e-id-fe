import { personAbi } from "@lib/web3/abis/personAbi";
import { getContract } from "../helpers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Gender, Organization, User } from "../types";
import { organizationAbi } from "../abis/organizationAbi";

export const createNewPerson = async (params: {
  signer?: JsonRpcSigner;
  user: User;
  walletAddress: string;
}) => {
  const { signer, user, walletAddress } = params;
  const contract: any = getContract(personAbi, process.env.NEXT_PUBLIC_PERSON_ADDRESS!, signer);

  const trx = await contract.mint(walletAddress, {
    ...user,
    gender: user.gender === Gender.Female ? 1 : 0,
  });
  return await trx.wait();
};

export const editPerson = async (params: {
  signer?: JsonRpcSigner;
  user: User;
  tokenId: string;
}) => {
  const { signer, user, tokenId } = params;
  const contract: any = getContract(personAbi, process.env.NEXT_PUBLIC_PERSON_ADDRESS!, signer);

  const trx = await contract.edit(tokenId, {
    ...user,
    gender: user.gender === Gender.Female ? 1 : 0,
  });
  return await trx.wait();
};

export const createOrganization = async (params: {
  signer?: JsonRpcSigner;
  data: Organization;
  walletAddress: string;
}) => {
  const { signer, data, walletAddress } = params;
  const contract: any = getContract(
    organizationAbi,
    process.env.NEXT_PUBLIC_ORGANIZATION_ADDRESS!,
    signer,
  );

  const trx = await contract.mint(walletAddress, {
    name: data.name,
    taxCode: data.tax,
  });
  return await trx.wait();
};

export const editOrganization = async (params: {
  signer?: JsonRpcSigner;
  data: Organization;
  tokenId: string;
}) => {
  const { signer, data, tokenId } = params;
  const contract: any = getContract(
    organizationAbi,
    process.env.NEXT_PUBLIC_ORGANIZATION_ADDRESS!,
    signer,
  );

  const trx = await contract.edit(tokenId, {
    name: data.name,
    taxCode: data.tax,
  });
  return await trx.wait();
};

export const addScore = async (params: {
  signer?: JsonRpcSigner;
  data: {
    tokenId: string;
    score: string;
    sId: string;
  };
}) => {
  const { signer, data } = params;
  const contract: any = getContract(personAbi, process.env.NEXT_PUBLIC_PERSON_ADDRESS!, signer);

  const trx = await contract.addScore(data.tokenId, data.sId, data.score);
  return await trx.wait();
};

export const subtractScore = async (params: {
  signer?: JsonRpcSigner;
  data: {
    tokenId: string;
    score: string;
    sId: string;
  };
}) => {
  const { signer, data } = params;
  const contract: any = getContract(personAbi, process.env.NEXT_PUBLIC_PERSON_ADDRESS!, signer);

  const trx = await contract.subtractScore(data.tokenId, data.sId, data.score);
  return await trx.wait();
};
