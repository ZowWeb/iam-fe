import { queryOptions } from '@tanstack/react-query'

import type { PolicyTag } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  principalId: string
}

export default function getPolicyTagsByPrincipal({ teamId, principalId }: Args) {
  return queryOptions<PolicyTag[]>({
    queryKey: ['GET_POLICY_TAGS_BY_PRINCIPAL', { teamId, principalId }],
    queryFn: async () => {
      const response = await apiServerWithThrow({
        endpoint: `/teams/${teamId}/principals/${principalId}/policy-tags`,
      })

      return response.json()
    },
  })
}
