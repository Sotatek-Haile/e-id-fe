"use client";

import { THEME_MODE } from "@app/_constants/theme";
import { DarkTheme, LightTheme } from "@lib/antd/themeConfig";
import { ConfigProvider } from "antd";
import React, { useState } from "react";

const ThemeConfigProvider = ({ children }: React.PropsWithChildren & any) => {
  const [ThemeMode, setThemeMode] = useState<string>(THEME_MODE.LIGHT);
  return (
    <ConfigProvider theme={ThemeMode === THEME_MODE.LIGHT ? LightTheme : DarkTheme}>
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfigProvider;
