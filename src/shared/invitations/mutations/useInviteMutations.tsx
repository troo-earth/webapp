import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInviteApi, checkInviteTokenApi, inviteUserApi, resendInviteApi, revokeInviteApi } from "../api/inviteApi";
import { notify } from "@/components/global/Toast";


export const useInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inviteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-invites'] });
    },
    onError: (error: any) => notify.error(error.message || "Failed to send invite"),
  });
};

export const useResendInvite = () => {
  return useMutation({
    mutationFn: resendInviteApi,
    onError: (error: any) => notify.error(error.message || "Failed to resend invite"),
  });
};

export const useAcceptInvite = () => {
  return useMutation({
    mutationFn: acceptInviteApi,
    onError: (error: any) => notify.error(error.message || "Failed to accept invite"),
  });
};

export const useRevokeInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokeInviteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-invites'] });
    },
    onError: (error: any) => notify.error(error.message || "Failed to revoke invite"),
  });
};

export const useCheckInviteToken = () => {
  return useMutation({
    mutationFn: checkInviteTokenApi,
    onError: (error: any) => notify.error(error.message || "Failed to verify invite token"),
  });
};