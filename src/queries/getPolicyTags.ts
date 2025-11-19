import { queryOptions } from '@tanstack/react-query'

import type { PolicyTag } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
}

export default function getPolicyTags({ teamId }: Args) {
  return queryOptions<PolicyTag[]>({
    queryKey: ['GET_POLICY_TAGS', { teamId }],
    queryFn: async () => {
      const response = await apiCloudfrontWithThrow({
        endpoint: `/teams/${teamId}/policy-tags`,
      })

      return response.json()
    },
  })
}
