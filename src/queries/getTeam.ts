import { queryOptions } from '@tanstack/react-query'

import type { Team } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

type GetTeamProps = {
  teamId: string
}

export const getTeam = ({ teamId }: GetTeamProps) =>
  queryOptions<Team>({
    queryKey: ['GET_TEAM'],
    queryFn: async () => {
      try {
        const response = await fetch(`https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}`)
        if (!response.ok) {
          throw new Error(
            `[getTeam] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getTeam] Error fetching team:`, handleErrorMessage(error))

        return null
      }
    },
  })
