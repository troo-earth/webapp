import { api } from "@/lib/axiosConfig";
import type { AuthResponse, LoginFormData, RegisterFormData } from "../types/authTypes";
import { handleError } from "@/utils/utils";
import type { User } from "@/types/global/types";
import { extractAuthObject } from "../utils/extractAuthObject";

export const loginApi = async (data: LoginFormData): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return extractAuthObject(response);
  } catch (error: unknown) { 
    throw new Error(handleError(error, "Failed to login."));
  }
};

export const registerApi = async (data: RegisterFormData): Promise<User> => {
  try {
    const trimmedFirstName = data.firstName.trim();
    const trimmedLastName = data.lastName?.trim() || '';
    
    const fullname = trimmedLastName 
      ? `${trimmedFirstName} ${trimmedLastName}` 
      : trimmedFirstName;
    
    const user_name = `${trimmedFirstName}${trimmedLastName}`.toLowerCase().replace(/\s+/g, '');
    
    const apiPayload = {
      user_name,
      email: data.email,
      password: data.password,
      fullname,
    };
    
    const response = await api.post<AuthResponse>('/users/create-user', apiPayload);
    return extractAuthObject(response);
  } catch (error: unknown) { 
    throw new Error(handleError(error, "Failed to register."))
  }
};

export const getMeApi = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/me');

    return extractAuthObject(response);
  } catch (error) {
    const status = error?.status;

    if (status === 401) {
      return null;
    }
    throw new Error(handleError(error, "Session expired"));
  }
};

export const logoutApi = async (): Promise<void | null> => {
  try {
    await api.delete('/auth/logout');
  } catch (error) {
    console.error("Server logout failed", error);
  }
};