  import { api } from "@/lib/axiosConfig";
  import type { AuthResponse, LoginFormData, OnboardingPayload, OrgResponse, RegisterFormData } from "../types/authTypes";
  import { handleError } from "@/utils/utils";
  import type { User } from "@/types/global/types";
  import { extractLoginAuthObject, extractRegisterAuthObject } from "../utils/extractAuthObject";
  import axios from "axios";

  export const loginApi = async (data: LoginFormData): Promise<User> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return extractLoginAuthObject(response);
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
            
      const apiPayload = {
        user_name: data.username,
        email: data.email,
        password: data.password,
        fullname,
      };
      
      const response = await api.post<AuthResponse>('/users/create-user', apiPayload);
      return extractRegisterAuthObject(response);
    } catch (error: unknown) { 
      throw new Error(handleError(error, "Failed to register."))
    }
  };

  export const getMeApi = async (): Promise<User | null> => {
    try {
      const response = await api.get('/auth/me');

      return extractLoginAuthObject(response);
    } catch (error) {
      const status = (error && typeof error === 'object' && 'status' in error) 
      ? (error as { status: number }).status 
      : null;

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
      throw new Error(handleError(error, "Failed to logout"));
    }
  };


  const handleSignedUpload = async (file: File, endpoint: string): Promise<string> => {
    try {
      const response = await api.post<{ 
        data: { uploadUrl: string; publicUrl: string; path: string } 
      }>(endpoint, { 
        file_name: file.name 
      });

      const { uploadUrl, publicUrl } = response.data.data;

      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      return publicUrl;
    } catch (error: unknown) {
      throw new Error(handleError(error, "Upload failed."));
    }
  };


  export const uploadLogoApi = async (file: File): Promise<string> => {
    return handleSignedUpload(file, '/uploads/org-logo');
  };

  export const uploadProofApi = async (file: File): Promise<string> => {
    return handleSignedUpload(file, '/uploads/org-doc');
  };


  export const onboardingApi = async (payload: OnboardingPayload): Promise<OrgResponse> => {
    try {
      const response = await api.post<OrgResponse>('/orgs/create-org', payload);
      return response.data;
    } catch (error: unknown) {
      throw new Error(handleError(error, "Onboarding process failed."));
    }
  };

  export const checkInviteTokenApi = async (token: string ) => {
    const payload = { token: token };
    try {
      const response = await api.post('/invitations/public/check-token', payload);
      return response.data;
    } catch (error: unknown) {
      throw new Error(handleError(error, "Invalid or expired invitation token."));
    }
  }