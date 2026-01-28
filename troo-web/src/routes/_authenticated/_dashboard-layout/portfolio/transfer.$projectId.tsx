import TransferCreditsPage from '@/pages/dashboard/project/TransferCreditPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/transfer/$projectId',
)({
  component: () => <TransferCreditsPage/>,
})
