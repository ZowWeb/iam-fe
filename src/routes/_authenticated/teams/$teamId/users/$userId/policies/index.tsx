import { createFileRoute } from '@tanstack/react-router'

import MemberPoliciesPage from '~/pages/MemberPoliciesPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId/policies/')({
  component: MemberPoliciesPage,
  loader: () => ({
    crumbTitle: 'Member Policies',
  }),
})
