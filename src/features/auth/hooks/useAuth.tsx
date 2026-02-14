import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { logoutApi } from "../api/authApi";
import { authQueries } from "../query/authQuery";
import { notify } from "@/components/global/Toast";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery(authQueries.me());

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      queryClient.clear();
      sessionStorage.clear();
      navigate({ to: '/login', replace: true });
      notify.success("Logged out successfully");
    },
  });

  return {
    user: user ?? null, 
    isAuthenticated: !!user,
    isLoading,
    logout: logoutMutation.mutate,
    isLogoutPending: logoutMutation.isPending,
  };
};

