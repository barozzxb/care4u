import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST || "http://localhost:9000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
