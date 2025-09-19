import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/PrincipalRolesPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId/roles/')({
  component: () => Page({ entity: 'member' }),
  loader: async () => {
    return {
      crumbTitle: 'Roles',
    }
  },
})
