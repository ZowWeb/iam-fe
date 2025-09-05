import { queryOptions } from '@tanstack/react-query'

import type { PolicyTag } from '~/types/data'

type Args = {
  teamId: string
  principalId: string
}

export default function getPolicyTagsByPrincipal({ teamId, principalId }: Args) {
  return queryOptions<PolicyTag[]>({
    queryKey: ['GET_POLICY_TAGS_BY_PRINCIPAL', { principalId }],
    queryFn: async () => {
      const response = await fetch(
        `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/principals/${principalId}/policy-tags`,
      )
      return response.json()
    },
  })
}
