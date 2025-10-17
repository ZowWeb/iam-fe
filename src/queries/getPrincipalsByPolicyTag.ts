import { queryOptions } from '@tanstack/react-query'

import type { PolicyTag, ServiceAccount, User } from '~/types/data'
import { fetchUser } from './getUser'
import { fetchServiceAccount } from './getServiceAccount'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyTagId: string
}

type Response = {
  users: User[]
  serviceAccounts: ServiceAccount[]
}

export const GET_PRINCIPALS_BY_POLICY_TAG = 'GET_PRINCIPALS_BY_POLICY_TAG'
/**
 * TODO: Temporary logic until we have the corresponding endpoint
 */
export const getPrincipalsByPolicyTag = ({ teamId, policyTagId }: Args) =>
  queryOptions<Response>({
    queryKey: [GET_PRINCIPALS_BY_POLICY_TAG, { teamId, policyTagId }],
    queryFn: async () => {
      const response = await apiServerWithThrow({
        endpoint: `/teams/${teamId}/policy-tags/${policyTagId}`,
      })

      const policyTag: PolicyTag = await response.json()

      // Split principals by userId and serviceAccountId
      const userIds = policyTag.principals.filter(p => p.startsWith('u-')) as `u-${string}`[]
      const saIds = policyTag.principals.filter(p => p.startsWith('s-')) as `s-${string}`[]

      // Query all
      const userPromises = userIds.map(userId => fetchUser(userId))
      const saPromises = saIds.map(id => fetchServiceAccount({ teamId, serviceAccountId: id }))
      const promises = userPromises.concat(saPromises)
      const results = await Promise.all(promises)

      // Split results
      const users = results.filter(p => p.id.startsWith('u-')) as User[]
      const serviceAccounts = results.filter(p => p.id.startsWith('s-')) as ServiceAccount[]

      return { users, serviceAccounts }
    },
  })
