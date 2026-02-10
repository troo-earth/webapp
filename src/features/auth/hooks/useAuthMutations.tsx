import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router"; 
import { loginApi, onboardingApi, registerApi, uploadLogoApi, uploadProofApi } from "../api/authApi";
import { authQueries } from "../query/authQuery";
import { notify } from "@/components/global/Toast";
import type { OnboardingParams } from "../types/authTypes";


export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      queryClient.setQueryData(authQueries.me().queryKey, data);
      navigate({ to: '/onboarding', replace: true });
      notify.success("User Registered successfully");

    },
    onError: () => {
      notify.error("Registration failed");
    }
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(authQueries.me().queryKey, data);
      navigate({ to: '/explore', replace: true });
      notify.success("Logged In successfully");
    },
    onError: () => {
      notify.error("Login failed");
    }
  });
};


export const useOnboarding = () => {
  const navigate = useNavigate();

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
      navigate({ to: '/explore', replace: true });
    },
    onError: (error) => {
      notify.error("Organization onboarding failed");
      console.error("Onboarding error:", error);
    }
  });
};