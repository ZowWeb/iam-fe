import { createFileRoute } from '@tanstack/react-router'

import PolicyPage from '~/pages/PolicyPage'

export const Route = createFileRoute('/teams/$teamId/policies/$policyId/')({
  component: PolicyPage,
})
