import axios, { Axios } from "axios";

export let http: Axios;

export const initializeHttp = () => {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
};

// TODO Alter defaults after instance has been created
// http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
