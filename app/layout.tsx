"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user?.loggedIn && !isAuthPage) {
      router.push("/login");
    }
    setIsLoaded(true);
  }, [isAuthPage, router]);

  if (!isLoaded) {
    return (
      <html lang="en" className="h-full">
        <body className="h-full bg-stone-50" />
      </html>
    );
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-amber-100 selection:text-amber-900`}
    >
      <body className="h-full bg-white flex">
        {!isAuthPage && <Sidebar />}
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {!isAuthPage && <Header />}
          <main className={`flex-1 overflow-y-auto ${!isAuthPage ? "bg-stone-50" : "bg-white"}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
