import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import axios from "axios";

const axiosConfig: CreateAxiosDefaults = {
    baseURL: 'https://troo.backend.com',
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    },
};

export const api: AxiosInstance = axios.create(axiosConfig);