import { queryOptions } from '@tanstack/react-query'

import type { Policy } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyId: string
}

export const fetchPolicy = async ({ teamId, policyId }: Args) => {
  const response = await apiCloudfrontWithThrow({
    endpoint: `/teams/${teamId}/policies/${policyId}`,
  })

  return response.json()
}

export const getPolicy = ({ teamId, policyId }: Args) =>
  queryOptions<Policy>({
    queryKey: ['GET_POLICY', { policyId }],
    queryFn: () => fetchPolicy({ teamId, policyId }),
  })
