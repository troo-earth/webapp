import { useNavigate } from '@tanstack/react-router';

export const useInviteFlow = () => {
  const navigate = useNavigate();

  const clearInvite = () => {
    navigate({
      to: '.', 
      search: (prev: Record<string, any>) => {
        const { 'invite_token': _, ...rest } = prev;
        return rest;
      },
      replace: true,
    });
  };

  return { clearInvite };
};