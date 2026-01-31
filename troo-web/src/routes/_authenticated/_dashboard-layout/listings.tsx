import ActiveListings from '@/pages/dashboard/ActiveListingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/listings',
)({
  component: () => <ActiveListings/>,
})
