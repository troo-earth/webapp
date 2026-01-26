import RetireCreditsPage from '@/pages/dashboard/listing/RetirePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/retire/$projectId',
)({
  component: () => <RetireCreditsPage/>,
})
