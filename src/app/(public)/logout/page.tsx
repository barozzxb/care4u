"use client";

import { toast } from "react-toastify";
export default function LogoutPage() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Đăng xuất thành công");
    window.location.href = "/login";
    return null;
};