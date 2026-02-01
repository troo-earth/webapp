import { HistoryPage } from '@/pages/dashboard/HistoryPage'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout/history')({
    component: () => <HistoryPage/>,
})