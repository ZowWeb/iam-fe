import { queryOptions } from '@tanstack/react-query'

import type { Team } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
}

export const GET_TEAM = 'GET_TEAM'

export default function getTeam({ teamId }: Args) {
  return queryOptions<Team>({
    queryKey: [GET_TEAM, { teamId }],
    queryFn: async () => {
      const response = await apiServerWithThrow({
        endpoint: `/teams/${teamId}`,
      })

      return response.json()
    },
  })
}
