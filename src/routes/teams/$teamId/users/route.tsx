import { createFileRoute, Outlet } from '@tanstack/react-router'

import { getMembers } from '~/queries/getMembers'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId/users')({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    return {
      members: await queryClient.ensureQueryData(getMembers),
      crumbTitle: 'Members',
    }
  },
})
