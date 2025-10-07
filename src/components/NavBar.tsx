"use client";
import { logout } from "@/features/auth/authService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserDetail {
    firstname: string;
    lastname: string;
    avatar: string;
}

const NavBar = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

    useEffect(() => {
        setEmail(localStorage.getItem('email'));
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            setUserDetail(userObj);
        }
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="absolute top-0 flex items-center p-4 bg-transparent text-gray-950 w-full z-index-100">
            <div className="flex justify-start">
                <Image src="/CARE4U.png" alt="Description" width="50" height="50" objectFit="cover" />
            </div>
            <div className="flex flex-1 justify-center">
                <div className="flex gap-8 space-x-4">
                    <Link href="/" className="font-bold hover:text-amber-900 transition-all duration-500">Trang chủ</Link>
                    <Link href="/aboutus" className="font-bold hover:text-amber-900 transition-all duration-500">Giới thiệu</Link>
                    <Link href="/services" className="font-bold hover:text-amber-900 transition-all duration-500">Dịch vụ</Link>
                    <Link href="/contact" className="font-bold hover:text-amber-900 transition-all duration-500">Liên hệ</Link>
                </div>
            </div>
            <div className="flex justify-end w-40">
                {email ? (
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-700">{userDetail?.firstname ? userDetail.firstname : email.substring(0, email.indexOf('@'))}</span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 bg-amber-400 text-white rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300"
                        >
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <a href="/login" className="font-bold hover:text-amber-800 transition-all duration-500">Đăng nhập</a>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
