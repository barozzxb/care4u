"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { isTokenExpired } from "@/utils/checkToken";
import { logout } from "@/services/authService";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }
            if (isTokenExpired(token)) {
                const message = await logout();
                console.log(message);
                toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            }
        }
        checkAuth();
    }, [pathname]);

    return <>{children}</>;
}