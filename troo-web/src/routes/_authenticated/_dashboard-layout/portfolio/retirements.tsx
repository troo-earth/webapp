import RetirementHistory from '@/pages/dashboard/listing/RetirementsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/retirements',
)({
  component: () => <RetirementHistory/>,
})
