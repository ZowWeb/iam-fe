import { queryOptions } from '@tanstack/react-query'

import type { Policy, PolicyTag } from '~/types/data'
import { fetchPolicy } from './getPolicy'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyTagId: string
}

export const GET_POLICIES_BY_POLICY_TAG = 'GET_POLICIES_BY_POLICY_TAG'
/**
 * TODO: Temporary logic until we have the corresponding endpoint
 */
export const getPoliciesByPolicyTag = ({ teamId, policyTagId }: Args) =>
  queryOptions<Policy[]>({
    queryKey: [GET_POLICIES_BY_POLICY_TAG, { teamId, policyTagId }],
    queryFn: async () => {
      const response = await apiServerWithThrow({
        endpoint: `/teams/${teamId}/policy-tags/${policyTagId}`,
      })

      const policyTag: PolicyTag = await response.json()
      const promises = policyTag.policies.map(p => fetchPolicy({ teamId, policyId: p }))
      const results = await Promise.all(promises)

      return results
    },
  })
