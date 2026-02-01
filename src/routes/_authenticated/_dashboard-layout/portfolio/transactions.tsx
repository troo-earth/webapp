import ActiveTransactions from '@/pages/dashboard/ActivetransactionsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/transactions',
)({
  component: () => <ActiveTransactions/>,
})
