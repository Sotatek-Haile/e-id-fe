import Denied from "@app/_components/Denied";
import { COOKIES_KEY, PERMISSIONS } from "@app/_constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ComponentType } from "react";
/**
 *
 * @param permission
 * @returns
 */
function hasRequiredPermissions(permission: string): boolean {
  const cookieStore = cookies();
  const role = cookieStore.get(COOKIES_KEY.ROLE)?.value;
  if (!role) redirect("/404");
  return PERMISSIONS[role].includes(permission);
}
/**
 *
 * @param Component
 * @param permission
 * @returns
 */
export function withRoleServer<T extends object = object>(
  Component: ComponentType<T>,
  permission: string
) {
  return function WithRolesWrapper(props: T) {
    const hasPermission = hasRequiredPermissions(permission);
    if (hasPermission) {
      return <Component {...props} />;
    } else {
      return <Denied />;
    }
  };
}
