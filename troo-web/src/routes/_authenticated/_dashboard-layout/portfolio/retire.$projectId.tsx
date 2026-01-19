import RetireCreditsPage from '@/pages/dashboard/project/RetirePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/retire/$projectId',
)({
  component: () => <RetireCreditsPage/>,
})
