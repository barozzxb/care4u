"use client";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import "./admin.css"

import SideBar from "@/components/admin/SideBar";
import Footer from "@/components/Footer";
import NavBar from "@/components/admin/NavBar";
import ToastProvider from "@/components/ToastProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useState } from "react";

const quicksand = Quicksand({
    variable: "--font-quicksand",
    subsets: ["latin"],
    weight: ["400", "700"],
});

// export const metadata: Metadata = {
//   title: "Care4U - Trang chủ Admin",
//   description: "Nền tảng chăm sóc sức khỏe và đặt lịch hẹn",
// };

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    return (
        <html lang="en">
            <body className={`h-screen w-full ${quicksand.variable} antialiased`}>
                <ProtectedRoute role="ADMIN">
                    <ToastProvider />
                    <header className="w-full bg-white shadow-md p-1">
                        <NavBar />
                    </header>
                    <div className="flex min-h-screen w-full">
                        <button
                            onClick={toggle}
                            className="md:hidden p-3 rounded-lg hover:bg-slate-100"
                        >
                            <svg className="w-7 h-7" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <aside className="hidden md:block w-64 min-w-56 bg-white shadow-lg border-r border-gray-200">
                            <SideBar />
                        </aside>

                        <section className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</section>
                    </div>
                    <Footer />
                </ProtectedRoute>
            </body>
        </html>


    );
}
