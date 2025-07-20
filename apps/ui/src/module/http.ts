import axios, { Axios } from "axios";

export let http: Axios;

export const initializeHttp = () => {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
