import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/PolicyTagsPage/MemberPolicyTagsPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId/roles/')({
  component: Page,
  loader: async () => {
    return {
      crumbTitle: 'Roles',
    }
  },
})
