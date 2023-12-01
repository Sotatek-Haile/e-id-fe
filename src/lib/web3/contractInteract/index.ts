import { personAbi } from "@abis/personAbi";
import { getContract } from "../helpers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Gender, User } from "../types";

export const createNewPerson = async (params: { signer?: JsonRpcSigner; user: User }) => {
  const { signer, user } = params;
  const contract: any = getContract(personAbi, process.env.NEXT_PUBLIC_PERSON_ADDRESS!, signer);

  const trx = await contract.mint(await signer?.getAddress(), {
    ...user,
    gender: user.gender === Gender.Female ? 1 : 0,
  });
  return await trx.wait();
};
