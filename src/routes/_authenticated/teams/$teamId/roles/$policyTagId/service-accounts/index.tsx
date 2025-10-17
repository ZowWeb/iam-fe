import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/BaseAssignmentPage/PolicyTagServiceAccountsPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles/$policyTagId/service-accounts/')({
  component: Page,
  loader: async () => {
    return {
      crumbTitle: 'Service Accounts',
    }
  },
})
