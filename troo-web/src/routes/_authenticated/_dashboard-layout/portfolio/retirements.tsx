import RetirementHistory from '@/pages/dashboard/project/RetirementsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/retirements',
)({
  component: () => <RetirementHistory/>,
})
