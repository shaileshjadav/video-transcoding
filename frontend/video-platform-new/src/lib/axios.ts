import axios from "axios";

let getTokenFn: (() => Promise<string | null>) | null = null;

export const setAuthTokenGetter = (fn: () => Promise<string | null>) => {
  getTokenFn = fn;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    if (getTokenFn) {
      const token = await getTokenFn();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
