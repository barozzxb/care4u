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

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`h-screen w-full ${quicksand.variable} antialiased`}>
      <ToastProvider />

      <header className="relative w-full z-50">
        <NavBar className="absolute top-0 left-0 bg-transparent" />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}