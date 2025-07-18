import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/MemberPolicies'

export const Route = createFileRoute('/teams/$teamId/users/$userId/policies/')({
  component: Page,
})
