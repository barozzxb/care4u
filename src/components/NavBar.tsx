import Image from "next/image";

const NavBar = () => {
    return (
        <nav className="absolute top-0 flex items-center p-4 bg-transparent text-gray-950 w-full z-index-100">
            <div className="flex justify-start">
                <Image src="/CARE4U.png" alt="Description" width="50" height="50" objectFit="cover" />
            </div>
            <div className="flex flex-1 justify-center">
                <div className="flex gap-8 space-x-4">
                    <a href="#" className="font-bold hover:text-amber-900 transition-all duration-500">Home</a>
                    <a href="#" className="font-bold hover:text-amber-900 transition-all duration-500">About</a>
                    <a href="#" className="font-bold hover:text-amber-900 transition-all duration-500">Services</a>
                    <a href="#" className="font-bold hover:text-amber-900 transition-all duration-500">Contact</a>
                </div>
            </div>
            <div className="flex justify-end w-40">
                <a href="/login" className="font-bold hover:text-amber-800 transition-all duration-500">Login</a>
            </div>
        </nav>
    );
};

export default NavBar;
