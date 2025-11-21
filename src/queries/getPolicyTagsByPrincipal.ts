import { queryOptions } from '@tanstack/react-query'

import type { PolicyTag } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  principalId: string
}

export const GET_POLICY_TAGS_BY_PRINCIPAL = 'GET_POLICY_TAGS_BY_PRINCIPAL'

export default function getPolicyTagsByPrincipal({ teamId, principalId }: Args) {
  return queryOptions<PolicyTag[]>({
    queryKey: [GET_POLICY_TAGS_BY_PRINCIPAL, { teamId, principalId }],
    queryFn: async () => {
      const response = await apiCloudfrontWithThrow({
        endpoint: `/teams/${teamId}/principals/${principalId}/policy-tags`,
      })

      return response.json()
    },
  })
}
