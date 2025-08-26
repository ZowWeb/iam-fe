import { createFileRoute, Outlet } from '@tanstack/react-router'

import { getServiceAccounts } from '~/queries/getServiceAccounts'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId/service-accounts')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      members: await queryClient.ensureQueryData(getServiceAccounts({ teamId })),
      crumbTitle: 'Service accounts',
    }
  },
})
