import { LoginPage } from '@/features/auth/components/login/LoginPage'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
})

export const Route = createFileRoute('/(public)/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: () => <LoginPage />,
})
