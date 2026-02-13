import LoadingScreen from '@/components/global/Loading'
import { notify } from '@/components/global/Toast'
import { checkInviteTokenApi } from '@/features/auth/api/authApi'
import { LoginPage } from '@/pages/auth/LoginPage'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
  'invite-token': z.string().optional(),
})

export const Route = createFileRoute('/(public)/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  
  loaderDeps: ({ search: { 'invite-token': inviteToken } }) => ({
    inviteToken,
  }),

  loader: async ({ deps: { inviteToken } }) => {
    if (inviteToken) {
      try {
        const response = await checkInviteTokenApi(inviteToken)
        return response
      } catch (error) {
        console.error("Invalid invite token", error)
        notify.error("Invalid or expired invitation token.")
        throw redirect({
          to: '/login', 
          replace: true,
        })
      }
    }
  },
  component: () => <LoginPage />,
  pendingComponent: () => <LoadingScreen />,
})