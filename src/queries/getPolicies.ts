import { queryOptions } from '@tanstack/react-query'

import type { Policy } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

type GetPoliciesProps = {
  teamId: string
}

export const getPolicies = ({ teamId }: GetPoliciesProps) =>
  queryOptions<Policy[] | undefined>({
    queryKey: ['GET_POLICIES', { teamId }],
    queryFn: async () => {
      try {
        const response = await fetch(`https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/policies`)
        if (!response.ok) {
          throw new Error(
            `[getPolicies] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getPolicies] Error fetching policies:`, handleErrorMessage(error))
      }
    },
  })
