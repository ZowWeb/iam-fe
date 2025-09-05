import { createFileRoute } from '@tanstack/react-router'

import PolicyPage from '~/pages/PolicyPage'
import { getPolicy } from '~/queries/getPolicy'

export const Route = createFileRoute('/_authenticated/teams/$teamId/policies/$policyId/')({
  component: PolicyPage,
  loader: async ({ context: { queryClient }, params: { teamId, policyId } }) => {
    const policy = await queryClient.ensureQueryData(getPolicy({ teamId, policyId }))

    return {
      policy,
      crumbTitle: policy?.name,
    }
  },
})
