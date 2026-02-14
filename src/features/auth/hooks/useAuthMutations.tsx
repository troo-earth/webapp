import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router"; 
import { loginApi, onboardingApi, registerApi, uploadLogoApi, uploadProofApi } from "../api/authApi";
import { authQueries } from "../query/authQuery";
import { notify } from "@/components/global/Toast";
import type { OnboardingParams } from "../types/authTypes";
import { acceptInviteApi } from "@/shared/invitations/api/inviteApi";


export const useRegister = (options?: { 
  onMutate?: () => void; 
  onSettled?: () => void 
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  

  const search = useSearch({ strict: false }); 
  const inviteToken = String(search?.invite_token || '');

  return useMutation({
    mutationFn: registerApi,
    onMutate: () => options?.onMutate?.(),
    onSettled: () => options?.onSettled?.(),
    onSuccess: async (data) => {
      queryClient.setQueryData(authQueries.me().queryKey, data);
      notify.success("User Registered successfully");

      if (inviteToken) {
        try {
          const response = await acceptInviteApi({token: inviteToken});
          const org = response?.data
          await queryClient.invalidateQueries({ queryKey: authQueries.me().queryKey });
          notify.success(`Joined ${org?.org_name} as a ${org?.role} successfully!`);
          navigate({ 
            to: '/explore', 
            search: { invite: 'success' },
            replace: true 
          });
          return; 
        } catch (error: any) {
          notify.error(error?.response?.data?.message || "Failed to join organization");
          navigate({ to: '/onboarding', replace: true });
          return;
        }
      }

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
  
  const search = useSearch({ strict: false });
  const inviteToken = search?.invite_token;

  return useMutation({
    mutationFn: loginApi,
    onMutate: () => {
      options?.onMutate?.();
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(authQueries.me().queryKey, data);
      notify.success("Logged In successfully");

      if (inviteToken) {
        try {
          const response = await acceptInviteApi({token: inviteToken});
          const org = response?.data
         
          notify.success(`Joined ${org?.org_name} as a ${org?.role} successfully!`);
          await queryClient.invalidateQueries({ queryKey: authQueries.me().queryKey });
          navigate({ 
            to: '/explore', 
            replace: true 
          });
          return; 
        } catch (error: any) {
          const errMsg = error?.response?.data?.message || "Failed to join organization";
          notify.error(errMsg);
        }
      }

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