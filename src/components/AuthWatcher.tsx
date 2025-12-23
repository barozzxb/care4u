"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isTokenExpired } from "@/utils/checkToken";
import { logout } from "@/services/authService";
import { toast } from "react-toastify";

export default function AuthWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (isTokenExpired(token)) {
      logout();
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    }
  }, [pathname]);

  return null;
}
