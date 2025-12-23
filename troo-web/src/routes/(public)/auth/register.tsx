import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/auth/register')({
  component: () => <div>Register Page Content</div>,
})
