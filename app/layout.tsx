import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Media Kit Generator",
  description: "Create beautiful, data-driven media kits in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="tiktok-developers-site-verification" content="PfW8fUKDXzAfVEjkZ4UPZl897aTUr7t5" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn("font-sans", inter.className)}>
        {children}
      </body>
    </html>
  );
} 