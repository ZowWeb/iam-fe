import { createFileRoute } from '@tanstack/react-router'

import TeamOverviewPage from '~/pages/TeamOverviewPage'
import { getAuthentication } from '~/queries/getAuthentication'
import getTeam from '~/queries/getTeam'

export const Route = createFileRoute('/_authenticated/teams/$teamId/')({
  component: TeamOverviewPage,
  loader: async ({ context: { queryClient } }) => {
    const authData = await queryClient.ensureQueryData(getAuthentication())
    return {
      team: await queryClient.ensureQueryData(getTeam({ teamId: authData.team.id })),
    }
  },
})
