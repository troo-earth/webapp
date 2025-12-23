import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
})

export const Route = createFileRoute('/(public)/auth/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: () => <div>Login Page</div>,
})
