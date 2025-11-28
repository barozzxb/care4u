import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
baseURL: process.env.NEXT_PUBLIC_HOST || "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const putFormData = (url: string, formData: FormData) => {
  return apiClient.put(url, formData);
};

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response.status === 401) {
            // const res = await apiClient.post("/auth/refresh-token",
            //     { refreshToken: localStorage.getItem("refreshToken") });
            // const data = res.data.body;
            // localStorage.setItem("token", data.token);
            // localStorage.setItem("refreshToken", data.refreshToken);
            // error.config.headers.Authorization = `Bearer ${data.token}`;
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userDetail");
            localStorage.clear();
            window.location.href = "/login";
            toast.error("Your session has expired. Please log in again.");
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
