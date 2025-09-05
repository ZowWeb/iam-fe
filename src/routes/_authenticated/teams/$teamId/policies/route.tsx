import { createFileRoute, Outlet } from '@tanstack/react-router'

import { getPolicies } from '~/queries/getPolicies'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/teams/$teamId/policies')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      policies: await queryClient.prefetchQuery(getPolicies({ teamId })),
      crumbTitle: 'Policies',
    }
  },
})
