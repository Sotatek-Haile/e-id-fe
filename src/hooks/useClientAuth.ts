import { logout } from "@app/_stores/user";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { COOKIES_KEY } from "@app/_constants";

export const useClientAuth = (serverAuth?: boolean) => {
  const token = useAppSelector((state) => state.user.accessToken);
  const dispatch = useAppDispatch();

  const [isAuth, setAuth] = useState(serverAuth);

  useEffect(() => {
    setAuth(!!token);
  }, [token]);

  const clientLogout = useCallback(() => {
    dispatch(logout());
    Cookies.remove(COOKIES_KEY.TOKEN);
    Cookies.remove(COOKIES_KEY.ROLE);
  }, [dispatch]);

  return {
    isAuth,
    logout: clientLogout,
  };
};
