import { createFileRoute } from '@tanstack/react-router'

import RolesPage from '~/pages/RolesPage'

export const Route = createFileRoute('/teams/$teamId/roles/')({
  component: RolesPage,
})
