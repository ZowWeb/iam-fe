import { createFileRoute } from '@tanstack/react-router'

import ServiceAccountsPage from '~/pages/ServiceAccountsPage'
import getServiceAccounts from '~/queries/getServiceAccounts'

export const Route = createFileRoute('/_authenticated/teams/$teamId/service-accounts/')({
  component: ServiceAccountsPage,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      serviceAccounts: await queryClient.ensureQueryData(getServiceAccounts({ teamId })),
    }
  },
})
