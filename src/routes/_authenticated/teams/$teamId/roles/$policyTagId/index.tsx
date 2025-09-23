import { createFileRoute } from '@tanstack/react-router'

import RolePage from '~/pages/RolePage'
import { getPoliciesByPolicyTag } from '~/queries/getPoliciesByPolicyTag'

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles/$policyTagId/')({
  component: RolePage,
  loader: async ({ context: { queryClient }, params: { teamId, policyTagId } }) => {
    const serviceAccount = await queryClient.ensureQueryData(getPoliciesByPolicyTag({ teamId, policyTagId }))

    return {
      serviceAccount,
      crumbTitle: policyTagId,
    }
  },
})
