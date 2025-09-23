import type { PatchPolicyTagsFromPrincipal, PolicyTag } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type AddRemovePolicyTagsFromPrincipalProps = {
  teamId: string
  principalId: string
  data: PatchPolicyTagsFromPrincipal
}

/**
 * Add or remove policy tags attached to a principal
 */
export default async function addRemovePolicyTagsFromPrincipal({
  data,
  teamId,
  principalId,
}: AddRemovePolicyTagsFromPrincipalProps): Promise<PolicyTag> {
  const response = await apiServerWithThrow({
    endpoint: `/teams/${teamId}/principals/${principalId}/policy-tags`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
