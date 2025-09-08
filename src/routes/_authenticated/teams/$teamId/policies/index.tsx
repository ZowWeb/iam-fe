import { createFileRoute } from '@tanstack/react-router'

import PoliciesPage from '~/pages/PoliciesPage'
import { getPolicies } from '~/queries/getPolicies'

export const Route = createFileRoute('/_authenticated/teams/$teamId/policies/')({
  component: PoliciesPage,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      policies: await queryClient.ensureQueryData(getPolicies({ teamId })),
    }
  },
})
