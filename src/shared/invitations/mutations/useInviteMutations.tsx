import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInviteTokenApi, inviteUserApi, resendInviteApi, revokeInviteApi } from "../api/inviteApi";


export const useInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inviteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-invites'] });
    },
  });
};

export const useResendInvite = () => {
  return useMutation({
    mutationFn: resendInviteApi,
  });
};

export const useRevokeInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokeInviteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['view-invites'] });
    },
  });
};

export const useCheckInviteToken = () => {
  return useMutation({
    mutationFn: checkInviteTokenApi,
  });
};