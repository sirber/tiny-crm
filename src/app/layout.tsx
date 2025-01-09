import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { check } from "@/lib/session";
import { Auth } from "@/features/auth/Auth";

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
          {hasSession ? children : <Auth />}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
