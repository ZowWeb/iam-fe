import { createFileRoute, Outlet } from '@tanstack/react-router'

import { getPolicyTags } from '~/queries/getPolicyTags'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId/roles')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      policyTags: await queryClient.prefetchQuery(getPolicyTags({ teamId })),
      crumbTitle: 'Roles',
    }
  },
})
