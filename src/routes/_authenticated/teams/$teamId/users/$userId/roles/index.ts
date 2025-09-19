import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/PrincipalPolicyTagsPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId/roles/')({
  component: () => Page({ entity: 'member' }),
  loader: async () => {
    return {
      crumbTitle: 'Roles',
    }
  },
})
