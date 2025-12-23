"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Quicksand } from "next/font/google";
import { isTokenExpired } from "@/utils/checkToken";
import { logout } from "@/services/authService";
import { toast } from "react-toastify";
import ToastProvider from "@/components/ToastProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (isTokenExpired(token)) {
            logout();
            toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }
    }, [pathname]);

    return (
        <html lang="vi">
            <body className={`${quicksand.variable}`}>
                <ToastProvider />
                {children}
            </body>
        </html>
    );
}
