import { createFileRoute } from '@tanstack/react-router'

import { TEAM_ID } from '~/constants/params'
import TeamOverviewPage from '~/pages/TeamOverviewPage'
import { getTeam } from '~/queries/getTeam'

export const Route = createFileRoute('/teams/$teamId/')({
  component: TeamOverviewPage,
  loader: async ({ context: { queryClient } }) => {
    return {
      team: await queryClient.ensureQueryData(getTeam({ teamId: TEAM_ID })),
    }
  },
})
