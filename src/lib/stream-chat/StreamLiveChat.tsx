"use client";
import LiveChat from "@app/_components/LiveChat";
import { IUserLiveChat } from "./types";
import { useEffect, useState } from "react";
const user: IUserLiveChat = {
  id: "vanhaiit",
  name: "dovansy",
  image: "https://getstream.io/random_png/?id=12131a1&name=dovansy",
};
const StreamLiveChat = () => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    (async () => {
      const token = await generateToken();
      setToken(token);
    })();
  }, []);

  async function generateToken() {
    const res = await fetch(window.location.origin + `/api`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: { token: string } = await res.json();
    return data.token;
  }

  return <LiveChat user={user} token={token!} />;
};

export default StreamLiveChat;
