import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/MemberPoliciesPage'

export const Route = createFileRoute('/teams/$teamId/users/$userId/policies/')({
  component: Page,
  loader: () => ({
    crumbTitle: 'Member Policies',
  }),
})
