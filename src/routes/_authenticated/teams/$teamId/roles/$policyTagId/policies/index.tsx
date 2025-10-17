import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/BaseAssignmentPage/PolicyTagPoliciesPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles/$policyTagId/policies/')({
  component: Page,
  loader: async () => {
    return {
      crumbTitle: 'Policies',
    }
  },
})
