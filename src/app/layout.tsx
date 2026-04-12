import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import SPBuddy from "@/components/SPBuddy";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SP App",
  description: "Singapore Power Utilities App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-950`}>
        <main className="pb-20 min-h-screen max-w-[430px] mx-auto bg-background">
          {children}
        </main>
        <SPBuddy />
        <BottomNav />
      </body>
    </html>
  );
}
