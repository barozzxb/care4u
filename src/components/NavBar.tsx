import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
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
                <a href="/login" className="font-bold hover:text-amber-800 transition-all duration-500">Đăng nhập</a>
            </div>
        </nav>
    );
};

export default NavBar;
