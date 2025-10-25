"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { sendOTP, verifyOTP } from "@/services/otpService";

const OTPPage = () => {

    const [loading, setLoading] = useState(false);

    const [otp, setOtp] = useState("");

    useEffect(() => {
        const sendOtpOnLoad = async () => {
            try {
                const {message} = await sendOTP();
                toast.success(message || "OTP đã được gửi đến email của bạn.");
            } catch (error) {
                console.error("Error sending OTP on load:", error);
                toast.error("Không thể gửi OTP. Vui lòng thử lại.");
            }
        };
        sendOtpOnLoad();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { status, message } = await verifyOTP(otp);
            if (status === 200) {
                toast.success(message || "Xác thực OTP thành công!");
                window.location.href = '/login';
            } else {
                toast.error(message || "Xác thực OTP thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Xác thực OTP thất bại. Vui lòng thử lại.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-auto md:w-2xl border-2 border-blue-800 rounded-lg shadow-lg p-4">
                <h2 className="text-center text-3xl font-bold mb-8 mt-6">Xác thực OTP</h2>
                <p className="text-center text-gray-600 mb-6">Hệ thống đã gửi OTP đến email của bạn. Vui lòng nhập OTP để xác thực.</p>
                <form className="flex flex-col gap-6 items-center w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <input type="number" id="otp" name="otp" required
                            value={otp} onChange={(e) => setOtp(e.target.value)}
                            placeholder=" "
                            className="peer border-2 border-gray-300 rounded-lg w-full px-4 pt-6 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-all" />
                        <label htmlFor="otp" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs bg-white px-1 pointer-events-none">OTP</label>
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-400 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:from-pink-500 hover:to-blue-400 transition-all duration-300 text-lg" disabled={loading} >Xác thực {loading ? <span className="animate-spin">...</span> : null}</button>
                </form>
            </div>
        </div>
    );
}
export default OTPPage;