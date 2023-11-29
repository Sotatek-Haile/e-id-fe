"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GGOAuthProvider = ({ children }: React.PropsWithChildren & any) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GGOAuthProvider;
