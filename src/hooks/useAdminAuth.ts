import { PATHS } from "@app/_constants/path";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAdminAuth = (tried: boolean) => {
  const router = useRouter();
  const { account } = useWeb3React();

  useEffect(() => {
    if (tried) {
      if (account) {
        router.push(PATHS.PersonManagement());
      } else {
        router.push(PATHS.Login());
      }
    }
  }, [account, router, tried]);
};
