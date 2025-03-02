import type {Metadata} from "next";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import NavBar from "@/components/NavBar";
import {check} from "@/lib/session";
import {Auth} from "@/features/auth/Auth";
import Theme from "./theme";

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
                {hasSession ? (
                    <>
                        <nav>
                            <NavBar/>
                        </nav>
                        <main>{children}</main>
                    </>
                ) : (
                    <main>
                        <Auth/>
                    </main>
                )}
            </Theme>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
