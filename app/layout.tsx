import type { Metadata } from "next";
import ThemeRegistry from './ThemeRegistry';
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiny CRM",
  description: "CRM for small business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
