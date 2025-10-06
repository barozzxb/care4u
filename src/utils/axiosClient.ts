import axios from "axios";
import apiClient from "@/services/apiClients";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response.status === 401) {
            const res = await apiClient.post("/auth/refresh-token",
                { refreshToken: localStorage.getItem("refreshToken") });
            const data = res.data.body;
            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
            error.config.headers.Authorization = `Bearer ${data.token}`;
            return axios(error.config);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
