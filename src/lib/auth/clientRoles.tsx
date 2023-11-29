import Denied from "@app/_components/Denied";
import { COOKIES_KEY, PERMISSIONS } from "@app/_constants";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { ComponentType } from "react";

/**
 * Check user role with client component
 *
 * @param Component Render component
 * @param permission Function permission
 * @returns
 */
export function withRoleClient<T extends object = object>(
  Component: ComponentType<T>,
  permission: string
) {
  return function WithRolesClientWrapper(props: T) {
    const userRole = Cookies.get(COOKIES_KEY.ROLE);

    if (!userRole) return redirect("/404");

    return PERMISSIONS[userRole].includes(permission) ? (
      <Component {...props} />
    ) : (
      <Denied />
    );
  };
}
