const NavBar = () => {
    return (
        <nav className="sticky top-0 flex items-center justify-center p-4 bg-gray-800 text-white">
            <div className="flex gap-8 space-x-4">
                <a href="#" className="hover:text-amber-200 transition-all duration-500">Home</a>
                <a href="#" className="hover:text-amber-200 transition-all duration-500">About</a>
                <a href="#" className="hover:text-amber-200 transition-all duration-500">Services</a>
                <a href="#" className="hover:text-amber-200 transition-all duration-500">Contact</a>
            </div>
        </nav>
    );
};

export default NavBar;
