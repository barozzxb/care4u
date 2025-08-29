import {Eye, EyeOff} from "lucide-react";
const Login = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-auto md:w-2xl border-2 border-blue-800 rounded-lg shadow-lg p-4">
                <h2 className="text-center text-2xl font-bold mb-4">Đăng nhập</h2>
                <form className="flex flex-col gap-6 items-center w-full max-w-md mx-auto">
                    <div className="relative w-full">
                        <input type="email" id="email" name="email" required
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <label htmlFor="email" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Email</label>
                    </div>
                    <div className="relative w-full">
                        <input type="password" id="password" name="password" required
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <label htmlFor="password" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Mật khẩu</label>
                        <Eye />
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-400 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:from-pink-500 hover:to-blue-400 transition-all duration-300 text-lg">Đăng nhập</button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-4">Bạn chưa có tài khoản? <a href="/register" className="text-blue-600 hover:underline">Đăng ký</a></p>
            </div>
        </div>
    );
}
export default Login;