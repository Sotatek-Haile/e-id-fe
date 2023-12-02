import { COOKIES_KEY } from "@app/_constants";
import { cookies } from "next/headers";

function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIES_KEY.TOKEN)?.value;
  return token;
}

function getAddress() {
  const cookieStore = cookies();
  const address = cookieStore.get(COOKIES_KEY.ACCOUNT)?.value;
  return address;
}

export { getToken, getAddress };
