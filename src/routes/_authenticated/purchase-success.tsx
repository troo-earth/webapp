import PaymentSuccessPage from '@/pages/PaymentSuccessPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchase-success')({
  component: PaymentSuccessPage
})


