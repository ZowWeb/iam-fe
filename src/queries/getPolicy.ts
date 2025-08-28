import { queryOptions } from '@tanstack/react-query'

import type { Policy } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

type GetPolicyProps = {
  teamId: string
  policyId: string
}

export const getPolicy = ({ teamId, policyId }: GetPolicyProps) =>
  queryOptions<Policy | undefined>({
    queryKey: ['GET_POLICY', { policyId }],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/policies/${policyId}`,
        )
        if (!response.ok) {
          throw new Error(
            `[getPolicy] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getPolicy] Error fetching policy:`, handleErrorMessage(error))
      }
    },
  })
