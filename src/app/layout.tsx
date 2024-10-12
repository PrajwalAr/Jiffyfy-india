import { Metadata } from "next";
import React from "react";
import "reset-css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Jiffyfy",
  description: "Your music, your way, your pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
