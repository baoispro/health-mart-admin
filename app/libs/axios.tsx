// src/lib/axios.js
import axios from "axios";

// ✅ Tạo Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor (thêm token vào headers nếu có)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (xử lý lỗi chung)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};

    if (status === 401) {
      console.warn("⚠️ Token hết hạn hoặc không hợp lệ");
      // Ví dụ: logout, redirect, v.v.
      // window.location.href = '/login';
    }

    if (status === 500) {
      console.error("💥 Server error!");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
