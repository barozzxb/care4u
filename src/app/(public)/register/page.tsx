"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-auto md:w-2xl border-2 border-blue-800 rounded-lg shadow-lg p-4">
                <h2 className="text-center text-3xl font-bold mb-8 mt-6">Đăng ký</h2>
                <p className="text-center text-gray-600 mb-6">Chào mừng bạn đến với <span className="emphasis">Care4U</span>! Đăng ký để trải nghiệm các dịch vụ tốt nhất dành cho bạn.</p>
                <form className="flex flex-col gap-6 items-center w-full max-w-md mx-auto">
                    <div className="relative w-full">
                        <input type="email" id="email" name="email" required
                            placeholder=" "
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <label htmlFor="email" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs bg-white px-1 pointer-events-none">Email</label>
                    </div>
                    <div className="relative w-full">
                        <input type="text" id="phone" name="phone" required
                            placeholder=" "
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <label htmlFor="phone" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs bg-white px-1 pointer-events-none">Số điện thoại</label>
                    </div>
                    <div className="relative w-full">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" required
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <div className="absolute right-3 top-5">
                            {!showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                            )}
                        </div>
                        <label htmlFor="password" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Mật khẩu</label>
                    </div>
                    <div className="relative w-full">
                        <input type={showPassword ? "text" : "password"} id="confirm-password" name="confirm-password" required
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <div className="absolute right-3 top-5">
                            {!showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                            )}
                        </div>
                        <label htmlFor="confirm-password" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Xác nhận mật khẩu</label>
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-400 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:from-pink-500 hover:to-blue-400 transition-all duration-300 text-lg">Đăng ký</button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-4">Bạn đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a></p>
            </div>
        </div>
    );
}
export default Register;