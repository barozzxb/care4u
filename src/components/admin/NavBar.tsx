"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { logout } from "@/services/authService";
import { IMG_HOST } from "@/utils/variables";

interface UserDetail {
    firstname: string;
    lastname: string;
    avatar: string;
}

const NavBar = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!profileRef.current) return;
            if (e.target instanceof Node && !profileRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setDropdownOpen(false);
                setMobileOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dropdownOpen]);

    useEffect(() => {
        setEmail(localStorage.getItem("email"));
        const user = localStorage.getItem("userDetail");
        if (user) {
            const userObj = JSON.parse(user);
            setUserDetail(userObj);
        }
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="w-full flex items-center justify-between p-3 bg-transparent">
            <div className="flex items-center gap-3">
                <Image src="/CARE4U.png" alt="Logo" width={50} height={50} />
            </div>

            <div className="hidden md:flex gap-8">
                <Link href="/" className="font-bold hover:text-amber-900 duration-300">Trang chủ</Link>
                <Link href="/aboutus" className="font-bold hover:text-amber-900 duration-300">Giới thiệu</Link>
                <Link href="/services" className="font-bold hover:text-amber-900 duration-300">Dịch vụ</Link>
                <Link href="/contact" className="font-bold hover:text-amber-900 duration-300">Liên hệ</Link>
            </div>

            <div className="flex items-center gap-2">
                {email ? (
                    <div ref={profileRef} className="relative">
                        <button
                            onClick={() => setDropdownOpen((open) => !open)}
                            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full pr-3 pl-1 py-1 shadow-sm transition-all"
                        >
                            <Image
                                src={`${IMG_HOST}${userDetail?.avatar}`}
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white w-48 rounded-xl border border-gray-200 shadow-lg z-20">
                                <div className="px-4 py-2 bg-blue-50 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-slate-700">
                                        Xin chào {userDetail?.firstname ?? email.substring(0, email.indexOf("@"))}
                                    </p>
                                </div>

                                <ul className="py-1 text-sm text-slate-700">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-blue-50">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="/admin/info" className="block px-4 py-2 hover:bg-blue-50">
                                            Thông tin
                                        </a>
                                    </li>
                                </ul>

                                <div className="border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <a href="/login" className="font-bold hover:text-amber-800 duration-300">Đăng nhập</a>
                )}

                <button
                    className="md:hidden ml-3 p-2 rounded-lg border border-gray-300"
                    onClick={() => setMobileOpen((open) => !open)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {mobileOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col md:hidden p-4 space-y-3 z-20">
                    <Link href="/" className="font-semibold">Trang chủ</Link>
                    <Link href="/aboutus" className="font-semibold">Giới thiệu</Link>
                    <Link href="/services" className="font-semibold">Dịch vụ</Link>
                    <Link href="/contact" className="font-semibold">Liên hệ</Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
