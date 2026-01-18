import { PurchasePage } from '@/pages/dashboard/project/PurchasePage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/$source/project/$projectId/purchase',
)({
  beforeLoad: () => {
    console.log("PURCHASE ROUTE REACHED");
  },
  component: PurchasePage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      price: (search.price as number) || 0, 
    }
  },
})


