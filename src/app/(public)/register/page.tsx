"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { register } from "@/services/authService";

import { toast } from "react-toastify";

const Register = () => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [alertMessage, setAlertMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            setAlertMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
            setLoading(false);
            return;
        }
        try {
            const { message } = await register(email, password, role);
                toast.success(message);
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Đăng ký thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
        
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-auto md:w-2xl border-2 border-blue-800 rounded-lg shadow-lg p-4">
                <h2 className="text-center text-3xl font-bold mb-8 mt-6">Đăng ký</h2>
                <p className="text-center text-gray-600 mb-6">Chào mừng bạn đến với <span className="emphasis">Care4U</span>! Đăng ký để trải nghiệm các dịch vụ tốt nhất dành cho bạn.</p>
                {alertMessage ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{alertMessage}</div> : null}
                <form className="flex flex-col gap-6 items-center w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <input type="email" id="email" name="email" required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <label htmlFor="email" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs bg-white px-1 pointer-events-none">Email</label>
                    </div>
                    {/* <div className="relative w-full">
                        <input type="text" id="phone" name="phone" required
                            placeholder=" "
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <label htmlFor="phone" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs bg-white px-1 pointer-events-none">Số điện thoại</label>
                    </div> */}
                    <div className="relative w-full">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" required
                            onChange={(e) => setPassword(e.target.value)}
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <div className="w-full flex flex-wrap gap-6 items-center justify-start mt-2 mb-2">
                        <div className="flex items-center gap-2">
                            <input type="radio" id="PATIENT" name="role" required
                                className=""
                                value={"PATIENT"} onChange={(e) => setRole(e.target.value)} />
                            <label htmlFor="PATIENT" className="text-gray-500 text-sm">Bệnh nhân</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="DOCTOR" name="role" required
                                className=""
                                value={"DOCTOR"} onChange={(e) => setRole(e.target.value)} />
                            <label htmlFor="DOCTOR" className="text-gray-500 text-sm">Bác sĩ</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="STAFF" name="role" required
                                className=""
                                value={"STAFF"} onChange={(e) => setRole(e.target.value)} />
                            <label htmlFor="STAFF" className="text-gray-500 text-sm">Nhân viên</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="ADMIN" name="role" required
                                className=""
                                value={"ADMIN"} onChange={(e) => setRole(e.target.value)} />
                            <label htmlFor="ADMIN" className="text-gray-500 text-sm">Quản trị viên</label>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-400 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:from-pink-500 hover:to-blue-400 transition-all duration-300 text-lg" disabled={loading}>
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-4">Bạn đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a></p>
            </div>
        </div>
    );
}
export default Register;