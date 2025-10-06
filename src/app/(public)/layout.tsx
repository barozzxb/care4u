import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Care4U - Sức khỏe và đặt lịch",
  description: "Nền tảng chăm sóc sức khỏe và đặt lịch hẹn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen w-full ${quicksand.variable} antialiased`}>
        <ToastProvider />

        <header className="relative top-0 left-0 w-full z-50">
          <NavBar />
        </header>
        <main className="">{children}</main>
        <Footer />

      </body>
    </html>
  );
}
