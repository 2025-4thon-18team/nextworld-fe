// src/apis/axiosInstance.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080", 
  withCredentials: true, // 필요하면 쿠키 사용
  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------------------------------------
// ✅ Request Interceptor
// --------------------------------------------------
axiosInstance.interceptors.request.use(
  (config) => {
    // 🔐 AccessToken 자동 주입
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // 📡 요청 로그
    const base = config.baseURL ?? "";
    const url = config.url ?? "";
    console.log("📡 [Axios Request]", base + url);

    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------------------------------------
// ✅ Response Interceptor
// --------------------------------------------------
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ [Axios Response]", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("❌ [Axios Error]", error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

export default axiosInstance;
