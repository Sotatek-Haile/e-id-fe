import W3Session from "@lib/web3/provider/session";
import { ReactNode, useEffect } from "react";
export function AuthProvider({ children }: { children: ReactNode }) {
  return <W3Session>{children}</W3Session>;
}
