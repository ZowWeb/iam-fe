import { createFileRoute, Outlet } from '@tanstack/react-router'

import AuthenticatedLayout from '~/components/Layout/AuthenticatedLayout'
import { TEAM_ID } from '~/constants/params'
import { getTeam } from '~/queries/getTeam'

const RouteComponent = () => (
  <AuthenticatedLayout>
    <Outlet />
  </AuthenticatedLayout>
)

export const Route = createFileRoute('/teams/$teamId')({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    return {
      team: await queryClient.ensureQueryData(getTeam({ teamId: TEAM_ID })),
      crumbTitle: 'Team Overview',
    }
  },
})
