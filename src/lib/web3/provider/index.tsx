"use client";

import { ReactNode } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { appConnectors } from "../connectors";
export function W3Provider({ children }: { children: ReactNode }) {
  return (
    <Web3ReactProvider connectors={appConnectors}>{children}</Web3ReactProvider>
  );
}
