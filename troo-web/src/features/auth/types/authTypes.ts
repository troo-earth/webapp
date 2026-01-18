import type z from "zod";
import type { loginSchema, onboardingSchema, registerSchema } from "../utils/authSchema";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;


export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface OnboardingPayload {
  org_name: string;
  country_code: string;
  registration_id?: string;
  logo_url?: string;
  incorporation_doc_url?: string;
}

export interface Organization {
  org_id: string ; 
  org_name: string;
  country_code: string;
  registration_id?: string;
  logo_url?: string;
  incorporation_doc_url?: string;
}

export interface OrgResponse {
  success: boolean;
  message: string;
  data: Organization;
}