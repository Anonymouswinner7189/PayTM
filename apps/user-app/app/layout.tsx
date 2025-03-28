import "./globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { AppBarClient } from "./AppBarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayTM Wallet",
  description: "PayTM Wallet App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppBarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
