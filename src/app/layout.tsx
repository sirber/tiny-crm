import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { check } from "@/lib/session";
import { Login } from "@/features/auth/Login";

export const metadata: Metadata = {
  title: "Tiny CRM",
  description: "CRM for small business",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasSession = await check();

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <NavBar hasSession={hasSession}></NavBar>
          {hasSession ? children : <Login />}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
