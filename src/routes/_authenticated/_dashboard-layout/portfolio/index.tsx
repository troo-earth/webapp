import { PortfolioPage } from '@/pages/dashboard/PortfolioPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout/portfolio/')({
    component: () => <PortfolioPage/>,
})