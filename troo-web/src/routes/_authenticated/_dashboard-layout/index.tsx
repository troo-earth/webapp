import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout/')({
    component: () => <div>Main Dashboard Content</div>,
})
