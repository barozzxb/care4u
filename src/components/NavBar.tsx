"use client";

import { logout } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRedirect } from "@/hooks/useRedirect";
import { toast } from "react-toastify";
import { FaStethoscope } from "react-icons/fa";

interface UserDetail {
  firstname: string;
  lastname: string;
  avatar?: string;
}

type NavBarProps = {
  className?: string;
};

const NavBar = ({ className = "" }: NavBarProps) => {
  const [email, setEmail] = useState<string | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const { redirectByRole } = useRedirect();

  useEffect(() => {
    const loadData = () => {
      setEmail(localStorage.getItem("email"));

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
      const user = localStorage.getItem("userDetail");
      if (user) setUserDetail(JSON.parse(user));
    };

    loadData();

    window.addEventListener("auth-changed", loadData);
    return () => window.removeEventListener("auth-changed", loadData);
  }, []);

  const handleLogout = async () => {
    const message = await logout();
    if (message) toast.success(message.toString());
  };

  const handleRoleRedirect = () => {
    const role = localStorage.getItem("role");
    if (role) redirectByRole(role);
  };

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 text-gray-950 w-full ${className}`}
    >
      <div className="flex justify-start">
        <Link href="/" aria-label="Về trang chủ">
          <Image
            src="/CARE4U.png"
            alt="Care4U logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex flex-1 justify-center">
        <div className="flex gap-8 space-x-4">
          <Link href="/" className="font-bold hover:text-amber-900">
            Trang chủ
          </Link>
          <Link href="/aboutus" className="font-bold hover:text-amber-900">
            Giới thiệu
          </Link>
          <Link href="/services" className="font-bold hover:text-amber-900">
            Dịch vụ
          </Link>
          <Link href="/contact" className="font-bold hover:text-amber-900">
            Liên hệ
          </Link>
        </div>
      </div>

      {email ? (
        <div className="flex items-center gap-3">
          {localStorage.getItem("role") === "DOCTOR" && (
            <Link
              href="/doctor"
              className="relative flex items-center gap-2 px-4 py-2 
              bg-gradient-to-r from-blue-500 to-purple-500 
              text-white rounded-xl font-semibold shadow-md 
              hover:shadow-lg hover:scale-[1.03] transition-all duration-300
              hover:from-pink-600 hover:to-yellow-500"
            >
              <FaStethoscope className="text-lg" />
              <span>Doctor Workspace</span>
            </Link>
          )}

          <button
            onClick={handleRoleRedirect}
            className="font-bold text-blue-700"
          >
            {userDetail?.firstname ?? email.split("@")[0]}
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-amber-400 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <a href="/login" className="font-bold hover:text-amber-800 transition">
          Đăng nhập
        </a>
      )}
    </nav>
  );
};

export default NavBar;
