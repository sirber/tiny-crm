import type {Metadata} from "next";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import NavBar from "@/features/layout/NavBar";
import {getUser, validateToken} from "@/lib/session";
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
    const hasSession = await validateToken();
    if (hasSession) {
        const user = await getUser();
        if (!user) {
            throw new Error('token is valid but user is not found');
        }
    }

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
