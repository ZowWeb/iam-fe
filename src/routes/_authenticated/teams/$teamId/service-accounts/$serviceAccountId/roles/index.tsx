import { createFileRoute } from '@tanstack/react-router'

import Page from '~/pages/BaseAssignmentPage/ServiceAccountPolicyTagsPage'

export const Route = createFileRoute(
  '/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/roles/',
)({
  component: Page,
  loader: () => ({
    crumbTitle: 'Roles',
  }),
})
