import apiClient from "@/services/apiClients";
import { jwtDecode } from "jwt-decode";

export const login = async (email: string, password: string) => {
    const res = await apiClient.post("/auth/login", { email, password });
    const { status, message, body } = res.data;
    if (status === 200) {
        if (body.token && body.refreshToken) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("refreshToken", body.refreshToken);
            localStorage.setItem("userDetail", body.user);
            localStorage.setItem("role", body.role);
            localStorage.setItem("email", email);
        }
    }
    return { status, message, body };
};

export const logout = async () => {
    const token = localStorage.getItem("token");
    const message = "Đăng xuất thành công!";
    if (!token) return;
    const decodedToken = jwtDecode<{ sub: string }>(token);
    const email = decodedToken.sub;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("userDetail");
    await apiClient.post("/auth/logout", { email });
    window.location.href = '/login';
    return { message };
};

export const register = async (email: string, password: string, role: string) => {
    const res = await apiClient.post("/auth/register", { email, password, role });
    const { message, body } = res.data;
    return { message, body };
}