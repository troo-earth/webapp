import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router"; 
import { loginApi, onboardingApi, registerApi, uploadLogoApi, uploadProofApi } from "../api/authApi";
import { authQueries } from "../query/authQuery";
import { notify } from "@/components/global/Toast";
import type { OnboardingParams } from "../types/authTypes";


export const useRegister = (options?: { 
  onMutate?: () => void; 
  onSettled?: () => void 
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,
    onMutate: () => options?.onMutate?.(),
    onSettled: () => options?.onSettled?.(),
    onSuccess: (data) => {
      queryClient.setQueryData(authQueries.me().queryKey, data);
      notify.success("User Registered successfully");
      // Logic for inviteToken check here to skip onboarding
      navigate({ to: '/onboarding', replace: true });
    },
    onError: (error: any) => {
      notify.error(error?.response?.data?.message || "Registration failed");
    }
  });
};

export const useLogin = (options?: { 
  onMutate?: () => void; 
  onSettled?: () => void 
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onMutate: () => {
      options?.onMutate?.();
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authQueries.me().queryKey, data);
      notify.success("Logged In successfully");
      navigate({ to: '/explore', replace: true });
    },
    onError: (error: any) => {
      notify.error(error?.response?.data?.message || "Login failed");
    }
  });
};


export const useOnboarding = () => {
  return useMutation({
    mutationFn: async ({ formData, logoFile, proofFile }: OnboardingParams) => {
      if (!logoFile || !proofFile) throw new Error("Files are missing");

      const [logoUrl, proofUrl] = await Promise.all([
        uploadLogoApi(logoFile),
        uploadProofApi(proofFile)
      ]);

      const finalPayload = {
        org_name: formData.companyName,
        country_code: formData.countryCode,
        registration_id: formData.registrationId,
        logo_url: logoUrl,
        incorporation_doc_url: proofUrl
      };

      return await onboardingApi(finalPayload);
    },
    onSuccess: () => {
      notify.success("Organization onboarded successfully");
    },
    onError: (error) => {
      notify.error("Organization onboarding failed");
      console.error("Onboarding error:", error);
    }
  });
};