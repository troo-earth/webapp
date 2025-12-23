import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout')({
    component: () => (
        <div className="dashboard-layout">
            <aside>Dashboard Sidebar</aside>
            <main><Outlet /></main>
        </div>
    ),
})