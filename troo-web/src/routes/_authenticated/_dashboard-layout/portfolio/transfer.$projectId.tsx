import TransferCreditsPage from '@/pages/dashboard/listing/TransferCreditPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/transfer/$projectId',
)({
  component: () => <TransferCreditsPage/>,
})
