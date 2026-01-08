import { RegisterPage } from '@/features/auth/components/register/RegisterPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/register')({
  component: () => <RegisterPage/>,
})
