import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { check } from "@/features/auth/actions";

export const metadata: Metadata = {
  title: "Tiny CRM",
  description: "CRM for small business",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasSession: boolean = await check();

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          {hasSession && <NavBar></NavBar>}
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
