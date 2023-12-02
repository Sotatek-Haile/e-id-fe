"use client";
import React from "react";
import AdminLayout from "../_components/layout";

const RootLayout = ({ children }: React.PropsWithChildren & any) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default RootLayout;
