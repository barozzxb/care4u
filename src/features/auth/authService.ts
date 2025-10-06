import apiClient from "@/services/apiClients";
import { jwtDecode } from "jwt-decode";

export const login = async (email: string, password: string) => {
    const res = await apiClient.post("/auth/login", { email, password });
    const {message, body} = res.data;
    if (body.token && body.refreshToken) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("refreshToken", body.refreshToken);
        localStorage.setItem("userDetail", body.user);
        localStorage.setItem("role", body.role);
        localStorage.setItem("email", email);
    }
    return {message, body};
};

export const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decodedToken: any = jwtDecode(token);
    const email = decodedToken.sub;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    await apiClient.post("/auth/logout", { email });
    window.location.href = '/login';
};