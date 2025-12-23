"use client";
import { logout } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

import { toast } from "react-toastify";

interface UserDetail {
    firstname: string;
    lastname: string;
    avatar: string;
}

const NavBar = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

    const loadUserData = () => {
        setEmail(localStorage.getItem('email'));
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userObj = JSON.parse(user);
                setUserDetail(userObj);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    };

    useEffect(() => {
        loadUserData();

        const handleUserUpdate = () => loadUserData();
        window.addEventListener('userUpdated', handleUserUpdate);

        return () => {
            window.removeEventListener('userUpdated', handleUserUpdate);
        };
    }, []);

    const handleLogout = async () => {
        const message = await logout();
        if (message) toast.success(message.toString());
    };

    const handleNameClick = () => {
        window.location.href = '/patient/viewdepartment';
    };

    return (
        <nav className="fixed flex items-center p-4 bg-transparent text-gray-950 w-full z-50">
            <div className="flex justify-start">
                <Image src="/CARE4U.png" alt="CARE4U" width={50} height={50} className="object-contain" />
            </div>

            <div className="flex flex-1 justify-center">
                <div className="flex gap-8">
                    <Link href="/" className="font-bold hover:text-amber-900 transition-all duration-500">Trang chủ</Link>
                    <Link href="/aboutus" className="font-bold hover:text-amber-900 transition-all duration-500">Giới thiệu</Link>
                    <Link href="/services" className="font-bold hover:text-amber-900 transition-all duration-500">Dịch vụ</Link>
                    <Link href="/contact" className="font-bold hover:text-amber-900 transition-all duration-500">Liên hệ</Link>
                </div>
            </div>

            <div className="flex justify-end w-40">
                {email ? (
                    <button
                        onClick={handleNameClick}
                        className="flex items-center gap-1.5 px-3 py-2 font-bold text-blue-700 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                    >
                        <User size={18} />
                        <span>
                            {userDetail?.lastname || userDetail?.firstname || email.split('@')[0]}
                        </span>
                    </button>
                ) : (
                    <a href="/login" className="font-bold hover:text-amber-800 transition-all duration-500">Đăng nhập</a>
                )}
            </div>
        </nav>
    );
};

export default NavBar;