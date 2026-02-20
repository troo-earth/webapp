import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/components/global/Toast";
import { updateOrganizationApi, updateUserRoleApi, removeUserFromOrgApi, updateUserProfileApi } from "../api/settingsApi";
import { inviteUserApi } from "@/shared/invitations/api/inviteApi";

type MutationConfig = {
  onSuccess?: () => void;
};

export const useUpdateOrganization = (config?: MutationConfig) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrganizationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-org'] });
      notify.success("Organization updated successfully");
      config?.onSuccess?.();
    },
    onError: (error: any) => notify.error(error.message || "Failed to update organization")
  });
};

export const useInviteUser = (config?: MutationConfig) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inviteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-invites'] });
      notify.success("Invitation sent!");
      config?.onSuccess?.();
    },
    onError: (error: any) => notify.error(error.message || "Failed to send invite")
  });
};

export const useUpdateUserRole = (config?: MutationConfig) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserRoleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-org'] });
      notify.success("Role updated successfully");
      config?.onSuccess?.();
    },
    onError: (error: any) => notify.error(error.message || "Failed to update role"),
  });
};

export const useRemoveUserFromOrg = (config?: MutationConfig) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeUserFromOrgApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-org'] });
      notify.success("Member removed successfully");
      config?.onSuccess?.();
    },
    onError: (error: any) => notify.error(error.message || "Failed to remove member"),
  });
};

export const useUpdateUser = (config?: MutationConfig) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-user'] });
      notify.success("Profile updated successfully");
      config?.onSuccess?.();
    },
    onError: (error: any) => {
      notify.error(error.message || "Failed to update profile");
    },
  });
};