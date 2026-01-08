import { api } from "@/lib/axiosConfig";
import type { AuthResponse, LoginFormData, RegisterFormData } from "../types/authTypes";
import axios from "axios";

export const LoginApi = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  } catch (error: unknown) { 
    let message = "Something went wrong. Please try again.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } 
    else if (error instanceof Error) {
      message = error.message;
    }

    throw new Error(message);
  }
};

export const RegisterApi = async (data: RegisterFormData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  } catch (error: unknown) { 
    let message = "Failed to create account.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    throw new Error(message);
  }
};