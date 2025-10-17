import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/BaseAssignmentPage/PolicyTagMembersPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles/$policyTagId/members/')({
  component: Page,
  loader: async () => {
    return {
      crumbTitle: 'Members',
    }
  },
})
