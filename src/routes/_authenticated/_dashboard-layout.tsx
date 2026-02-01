import DashboardLayout from '@/components/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout')({
    component: () => <DashboardLayout/>
})