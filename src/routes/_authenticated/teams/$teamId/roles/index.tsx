import { createFileRoute } from '@tanstack/react-router'

import RolesPage from '~/pages/RolesPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles/')({
  component: RolesPage,
})
