import { ExplorePage } from '@/pages/dashboard/ExplorePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout/explore')({
    component: () => <ExplorePage/>,
})