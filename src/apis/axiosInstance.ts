import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: false, // ⚠️ CORS 문제가 생기면 true로 변경
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const base = config.baseURL ?? "";
    const url = config.url ?? "";
    console.log("📡 [Axios Request]", base + url);

    return config;
  },
  (error) => Promise.reject(error)
);


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
