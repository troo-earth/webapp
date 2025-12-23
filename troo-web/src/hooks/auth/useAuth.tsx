import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { api } from '../../lib/axiosConfig';
import { useNavigate } from '@tanstack/react-router';
import { clearAuth, setAuth } from "../../features/auth/state/authSlice";
import { AxiosError } from 'axios';

export interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthState {
    user: User | null;
    status: 'authenticated' | 'unauthenticated' | 'loading';
}

interface RootState {
    auth: AuthState;
}

export const useAuth = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const authState = useSelector((state: RootState) => state.auth);

    const { data, isLoading, isError, error } = useQuery<User, AxiosError>({
        queryKey: ['auth-user'],
        queryFn: async () => {
            const response = await api.get<User>('/auth/me');
            return response.data;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (data) {
            dispatch(setAuth(data));
        }
        if (isError && error?.response?.status === 401) {
            dispatch(clearAuth());
        }
    }, [data, isError, error, dispatch]);

    const logoutMutation = useMutation({
        mutationFn: () => api.post('/auth/logout'),
        onSuccess: () => {
            dispatch(clearAuth());
            queryClient.clear();
            navigate({ to: '/login' });
        },
    });

    return {
        isAuthenticated: authState.status === 'authenticated',
        user: authState.user,
        isLoading,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
    };
};