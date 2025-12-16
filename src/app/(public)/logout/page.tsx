"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { logout } from "@/services/authService";

export default function LogoutPage() {
  useEffect(() => {
    logout();
  }, []);

  return <p>Đang đăng xuất...</p>;
}
