import { queryOptions } from '@tanstack/react-query'

import type { Policy } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyId: string
}

export const getPolicy = ({ teamId, policyId }: Args) =>
  queryOptions<Policy>({
    queryKey: ['GET_POLICY', { policyId }],
    queryFn: async () => {
      const response = await apiServerWithThrow({
        endpoint: `/teams/${teamId}/policies/${policyId}`,
      })

      return response.json()
    },
  })
