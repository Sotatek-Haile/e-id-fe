import "@app/_styles/globals.scss";
import StyledComponentsRegistry from "@lib/antd/AntdRegistry";
import ThemeConfigProvider from "@lib/antd/ConfigProvider";
import { AuthProvider } from "@lib/auth/provider";
import { locales } from "@lib/next-intl";
import { ReduxProvider } from "@lib/redux/provider";
import { W3Provider } from "@lib/web3/provider";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unibit Horse Racing",
  description: "Generated Unibit Horse Racing",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = async ({ children }: React.PropsWithChildren & any) => {
  const className = inter.className + " bg-light-gray";

  return (
    <html>
      <body data-theme="light" className={className}>
        <W3Provider>
          <StyledComponentsRegistry>
            <ReduxProvider>
              <ThemeConfigProvider>
                <AuthProvider>{children}</AuthProvider>
              </ThemeConfigProvider>
            </ReduxProvider>
          </StyledComponentsRegistry>
        </W3Provider>
      </body>
    </html>
  );
};

export default RootLayout;
