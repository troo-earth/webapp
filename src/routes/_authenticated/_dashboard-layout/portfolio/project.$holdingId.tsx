import { PortfolioProjectDetailPage } from "@/pages/dashboard/PortfolioProjectDetailPage"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/portfolio/project/$holdingId'
)({
  component: () => <PortfolioProjectDetailPage />,
})