import type {Metadata} from "next";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import NavBar from "@/features/layout/NavBar";
import {check} from "@/lib/session";
import Theme from "./theme";
import React from "react";

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
            <Theme>
                <NavBar hasSession={hasSession}/>
                <main>{children}</main>
            </Theme>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
