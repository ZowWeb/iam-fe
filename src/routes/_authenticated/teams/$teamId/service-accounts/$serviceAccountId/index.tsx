import { createFileRoute } from '@tanstack/react-router'

import ServiceAccountPage from '~/pages/ServiceAccountPage'
import getPolicyTagsByPrincipal from '~/queries/getPolicyTagsByPrincipal'
import { getServiceAccount } from '~/queries/getServiceAccount'

export const Route = createFileRoute('/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/')({
  component: ServiceAccountPage,
  loader: async ({ context: { queryClient }, params: { teamId, serviceAccountId } }) => {
    const [serviceAccount, policyTags] = await Promise.all([
      queryClient.ensureQueryData(getServiceAccount({ teamId, serviceAccountId })),
      queryClient.ensureQueryData(getPolicyTagsByPrincipal({ teamId, principalId: serviceAccountId })),
    ])

    return {
      serviceAccount,
      policyTags,
      crumbTitle: serviceAccount?.displayName,
    }
  },
})
