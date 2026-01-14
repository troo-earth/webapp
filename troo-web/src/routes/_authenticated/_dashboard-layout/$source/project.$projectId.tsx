import { ProjectPage } from '@/pages/dashboard/ProjectPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/$source/project/$projectId'
)({
  component: ProjectPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      price: (search.price as number) || 0, 
    }
  },
})

