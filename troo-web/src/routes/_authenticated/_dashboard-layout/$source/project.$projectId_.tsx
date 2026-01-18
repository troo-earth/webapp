import { ProjectPage } from '@/pages/dashboard/project/ProjectPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/$source/project/$projectId_'
)({
  component: () => <ProjectPage />,
})

