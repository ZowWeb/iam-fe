import { queryOptions } from '@tanstack/react-query'

import type { Policy } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
}

export const getPolicies = ({ teamId }: Args) =>
  queryOptions<Policy[]>({
    queryKey: ['GET_POLICIES', { teamId }],
    queryFn: async () => {
      const response = await apiCloudfrontWithThrow({ endpoint: `/teams/${teamId}/policies` })

      return response.json()
    },
  })
