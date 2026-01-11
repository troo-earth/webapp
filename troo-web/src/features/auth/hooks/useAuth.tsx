import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { logoutApi } from "../api/authApi";
import { authQueryOptions } from "../query/authQuery";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery(authQueryOptions);

  const logout = useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      queryClient.setQueryData(authQueryOptions.queryKey, null);
      queryClient.invalidateQueries({ queryKey: authQueryOptions.queryKey }); 
      navigate({ to: '/login', replace: true });
    },
  });

  return {
    user: user ?? null, 
    isAuthenticated: !!user,
    isLoading,
    logout: logout.mutate,
  };
};

