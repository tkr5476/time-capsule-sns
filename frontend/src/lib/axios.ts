// frontend/src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://nginx/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 401エラー時にログインページへリダイレクト
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;