import { createFileRoute } from '@tanstack/react-router'

import RolesPage from '~/pages/RolesPage'
import getPolicyTags from '~/queries/getPolicyTags'

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles/')({
  component: RolesPage,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      policyTags: await queryClient.ensureQueryData(getPolicyTags({ teamId })),
    }
  },
})
