
const HeroSection = () => {
    return (
        <section className="relative w-full flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 rounded-full opacity-30 blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse overflow-hidden" />

                <div className="text-center relative z-10 max-w-2xl mx-auto p-8">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 drop-shadow-lg mb-6">Chào mừng đến với <span className="text-blue-600">Care4U</span></h1>
                    <p className="mt-2 text-2xl md:text-3xl text-gray-700 font-medium mb-8">Sức khỏe của bạn là <span className="text-pink-600 font-bold">ưu tiên</span> của chúng tôi</p>
                    <a href="#" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-amber-400 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-400 transition-all duration-300 text-lg">Bắt đầu</a>
                </div>

            <div className="absolute bottom-10 animate-bounce">
                <p className="text-gray-700">Scroll Down</p>
            </div>
        </section>
    );
};

export default HeroSection;