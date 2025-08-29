const Footer = () => {
    return (
        <footer className="w-full py-8 flex flex-col items-center bg-gray-100">
            <div className="grid grid-cols-3 mx-auto text-center">
                <div className="p-3">
                    <a href="#" className="text-gray-600 hover:underline">Privacy Policy</a>
                </div>
                <div className="p-3">
                    <a href="#" className="text-gray-600 hover:underline">Terms of Service</a>
                </div>
                <div className="p-3">
                    <a href="#" className="text-gray-600 hover:underline">Contact Us</a>
                </div>
            </div>
            <p className="text-gray-600">2025 - Care4U. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
