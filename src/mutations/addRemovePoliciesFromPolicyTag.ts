import type { PatchPoliciesFromPolicyTag } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyTagId: string
  data: PatchPoliciesFromPolicyTag
}

/**
 * Add or remove policy tags attached to a principal
 */
export default async function addRemovePoliciesFromPolicyTag({
  data,
  teamId,
  policyTagId,
}: Args): Promise<PatchPoliciesFromPolicyTag> {
  const response = await apiCloudfrontWithThrow({
    endpoint: `/teams/${teamId}/policy-tags/${policyTagId}/policies`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
