import LoadingScreen from '@/components/global/Loading';
import { notify } from '@/components/global/Toast';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { checkInviteTokenApi } from '@/shared/invitations/api/inviteApi';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

const registerSearchSchema = z.object({
  'invite_token': z.string().optional(),
});

export const Route = createFileRoute('/(public)/register')({
  validateSearch: (search) => registerSearchSchema.parse(search),

  loaderDeps: ({ search: { 'invite_token': inviteToken } }) => ({
    inviteToken,
  }),

  loader: async ({ deps: { inviteToken } }) => {
    if (inviteToken) {
      try {
        const response = await checkInviteTokenApi(inviteToken);
        return response;
      } catch (error) {
        console.error("Invalid invite token", error);
        notify.error("Invalid or expired invitation token.");
        
        throw redirect({
          to: '/register',
          replace: true,
        });
      }
    }
    return null; 
  },

  component: () => <RegisterPage />,
  pendingComponent: () => <LoadingScreen />,
});