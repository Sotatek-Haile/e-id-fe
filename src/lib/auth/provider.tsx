import { ReactNode } from "react";
import { getAddress, getToken } from ".";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
export function AuthProvider({ children }: { children: ReactNode }) {
  const token = getToken();
  if (!token) return redirect("/login");
  const headersList = headers();
  const patch = headersList.get("x-pathname");
  const address = getAddress();

  if (address !== "0x46056E1B8a27008Bd778a0fE76E6c196b32f4ab6" && patch !== "/") {
    return redirect("/");
  }

  return <section>{children}</section>;
}
