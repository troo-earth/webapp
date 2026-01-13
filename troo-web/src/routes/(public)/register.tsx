import { RegisterPage } from '@/pages/auth/RegisterPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/register')({
  component: () => <RegisterPage/>,
})
