import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrganizationApi, updateUserProfileApi, inviteUserApi } from "../api/settingsApi"; 

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrganizationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['update-org'] }); 
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['update-user'] });
    },
  });
};

export const useInviteUser = () => {  
  return useMutation({
    mutationFn: inviteUserApi,
  });
};