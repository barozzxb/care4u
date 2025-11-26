"use client";
import { logout } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, User, FileText, Activity, Calendar, LogOut } from "lucide-react"; // Thêm Calendar

import { useRedirect } from "@/hooks/useRedirect";
import { toast } from "react-toastify";

interface UserDetail {
    firstname: string;
    lastname: string;
    avatar: string;
}

const NavBar = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ✅ Hàm load user data
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

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('userUpdated', handleUserUpdate);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        const message = await logout();
        if (message) toast.success(message.toString());
        setIsDropdownOpen(false);
    };

    // CHUYỂN TRANG KHI CLICK TÊN → /patient/viewdepartment
    const handleNameClick = () => {
        window.location.href = '/patient/viewdepartment';
    };

    // MỞ/TẮT DROPDOWN KHI CLICK MŨI TÊN
    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <nav className="absolute top-0 flex items-center p-4 bg-transparent text-gray-950 w-full z-50">
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
                    <div className="relative" ref={dropdownRef}>
                        {/* BUTTON: TÊN + MŨI TÊN */}
                        <div className="flex items-center gap-1 px-3 py-2 font-bold text-blue-700 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                            {/* TÊN USER → /patient/viewdepartment */}
                            <button
                                onClick={handleNameClick}
                                className="flex items-center gap-1.5"
                            >
                                <User size={18} />
                                <span>
                                    {userDetail?.lastname || userDetail?.firstname || email.split('@')[0]}
                                </span>
                            </button>

                            {/* MŨI TÊN → MỞ DROPDOWN */}
                            <button
                                onClick={toggleDropdown}
                                className="ml-1 p-1 rounded hover:bg-blue-100 transition-colors"
                            >
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                        </div>

                        {/* DROPDOWN MENU */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                                {/* Header */}
                                <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white">
                                    <p className="font-semibold">
                                        {(userDetail?.firstname && userDetail?.lastname)
                                            ? `${userDetail.firstname} ${userDetail.lastname}`
                                            : (userDetail?.lastname || userDetail?.firstname || 'User')}
                                    </p>
                                    <p className="text-xs text-blue-100">{email}</p>
                                </div>

                                <div className="py-2">
                                    {/* TRANG CÁ NHÂN → /patient/updateinfo */}
                                    <Link
                                        href="/patient/updateinfo"
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <User size={16} className="text-blue-600" />
                                        <span>Trang cá nhân</span>
                                    </Link>

                                    {/* View Medical History */}
                                    <Link
                                        href="/patient/medical-history"
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FileText size={16} className="text-green-600" />
                                        <span> Xem hồ sơ y tế</span>
                                    </Link>

                                    {/* Update Measurement */}
                                    <Link
                                        href="/patient/update-measurement"
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <Activity size={16} className="text-purple-600" />
                                        <span>Cập nhật chỉ số đo</span>
                                    </Link>

                                    {/* XEM LỊCH HẸN → /patient/viewappointments */}
                                    <Link
                                        href="/patient/viewappointments"
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <Calendar size={16} className="text-teal-600" />
                                        <span>Xem lịch hẹn</span>
                                    </Link>
                                </div>

                                {/* Logout */}
                                <div className="border-t border-gray-200">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <LogOut size={16} />
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <a href="/login" className="font-bold hover:text-amber-800 transition-all duration-500">Đăng nhập</a>
                )}
            </div>
        </nav>
    );
};

export default NavBar;