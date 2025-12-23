import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard-layout/MyProjects')({
    component: () => <div>My Projects Content</div>,
})