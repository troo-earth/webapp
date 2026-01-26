import { ListingPage } from '@/pages/dashboard/listing/ListingPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/$source/listing/$listingId_'
)({
  component: () => <ListingPage />,
})

