import {
  IconBNB,
  IconBTC,
  IconETH,
  IconLTC,
  IconLogo,
  IconOne,
  IconUSDT,
} from "@app/_components/icons";
import { ReactElement } from "react";

interface TokenProps {
  label: string;
  icon: ReactElement;
}

export const TOKENS: TokenProps[] = [
  { label: "UNI", icon: <IconLogo /> },
  { label: "USDT", icon: <IconUSDT /> },
  { label: "ETH", icon: <IconETH /> },
  { label: "BNB", icon: <IconBNB /> },
  { label: "BTC", icon: <IconBTC /> },
  { label: "TRX", icon: <IconLTC /> },
  { label: "ONE", icon: <IconOne /> },
];
