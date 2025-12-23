import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout/Inventory')({
    component: () => <div>Inventory Content</div>,
})