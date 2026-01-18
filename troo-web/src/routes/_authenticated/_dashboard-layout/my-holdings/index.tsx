import { MyHoldingsPage } from '@/pages/dashboard/MyHoldingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout/my-holdings/')({
    component: () => <MyHoldingsPage />,
})