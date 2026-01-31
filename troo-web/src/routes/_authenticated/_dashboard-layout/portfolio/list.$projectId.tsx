import ListCreditsPage from '@/pages/dashboard/listing/ListCreditPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/list/$projectId',
)({
  component: () => <ListCreditsPage/>,
})
