import { createFileRoute } from '@tanstack/react-router'

import ServiceAccountPage from '~/pages/ServiceAccountPage'
import { getServiceAccount } from '~/queries/getServiceAccount'

export const Route = createFileRoute('/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/')({
  component: ServiceAccountPage,
  loader: async ({ context: { queryClient }, params: { teamId, serviceAccountId } }) => {
    const serviceAccount = await queryClient.ensureQueryData(getServiceAccount({ teamId, serviceAccountId }))

    return {
      serviceAccount,
      crumbTitle: serviceAccount?.displayName,
    }
  },
})
