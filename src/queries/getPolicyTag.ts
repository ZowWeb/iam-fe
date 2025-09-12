import { queryOptions } from '@tanstack/react-query'

import type { PolicyTag } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyTagId: string
}

export const fetchPolicyTag = async ({ teamId, policyTagId }: Args) => {
  const response = await apiServerWithThrow({
    endpoint: `/teams/${teamId}/policy-tags/${policyTagId}`,
  })

  return response.json()
}

export default function getPolicyTag({ teamId, policyTagId }: Args) {
  return queryOptions<PolicyTag | undefined>({
    queryKey: ['GET_POLICY_TAG', { policyTagId }],
    queryFn: async () => fetchPolicyTag({ teamId, policyTagId }),
  })
}
