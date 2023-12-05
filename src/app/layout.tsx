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
  title: "E-ID",
  description: "National Service Portal",
  icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Greater_coat_of_arms_of_the_United_States.svg/220px-Greater_coat_of_arms_of_the_United_States.svg.png",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = async ({ children }: React.PropsWithChildren & any) => {
  const className = inter.className + " bg-light-gray";

  return (
    <html>
      <head>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Greater_coat_of_arms_of_the_United_States.svg/220px-Greater_coat_of_arms_of_the_United_States.svg.png"
        />
      </head>
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
