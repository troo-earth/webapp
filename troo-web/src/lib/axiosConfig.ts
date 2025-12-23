import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import axios from "axios";

const axiosConfig: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    },
};

export const api: AxiosInstance = axios.create(axiosConfig);