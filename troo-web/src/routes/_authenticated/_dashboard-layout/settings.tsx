import SettingsPage from '@/pages/dashboard/SettingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_dashboard-layout/settings',
)({
  component: () => <SettingsPage />,
})

