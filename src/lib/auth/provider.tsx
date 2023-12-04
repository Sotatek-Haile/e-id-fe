import { ReactNode } from "react";
import { getAddress, getToken } from ".";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import W3Session from "@lib/web3/provider/session";
export function AuthProvider({ children }: { children: ReactNode }) {
  const token = getToken();
  if (!token) return redirect("/login");
  const headersList = headers();
  const patch = headersList.get("x-pathname");
  const address = getAddress();

  if (address !== process.env.NEXT_PUBLIC_ADMIN_ADDRESS && patch !== "/") {
    return redirect("/");
  }

  return <W3Session>{children}</W3Session>;
}
