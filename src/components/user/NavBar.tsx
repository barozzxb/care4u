"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { logout } from "@/features/auth/authService";

interface UserDetail {
    firstname: string;
    lastname: string;
    avatar: string;
}

const NavBar = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <nav className="top-0 flex items-center p-4 bg-transparent text-gray-950 w-full z-index-100">
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
            <div className="flex justify-end">
                {email ? (
                    <>
                        <button
                            id="dropdownDividerButton"
                            onClick={() => setDropdownOpen((open) => !open)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            {userDetail?.firstname ? userDetail.firstname : email.substring(0, email.indexOf('@'))}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div
                                id="dropdownDivider"
                                className="absolute mt-2 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Thông tin</a>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Đăng xuất</button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <a href="/login" className="font-bold hover:text-amber-800 transition-all duration-500">Đăng nhập</a>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
