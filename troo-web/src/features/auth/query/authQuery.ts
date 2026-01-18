import { queryOptions } from '@tanstack/react-query';
import { getMeApi } from '../api/authApi';

export const authQueryOptions = queryOptions({
  queryKey: ['auth-me'],
  queryFn: getMeApi, 
  staleTime: Infinity,
  retry: false,
});