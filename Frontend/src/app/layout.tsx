import { ReactNode } from "react";
// @ts-ignore
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className="bg-[url('/img/home-background.png')] bg-fixed bg-top bg-repeat-y bg-[size:100%_auto]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

export default Layout;