import type { PatchPolicyTagsFromPrincipal } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
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
}: Args): Promise<PatchPolicyTagsFromPrincipal> {
  const response = await apiCloudfrontWithThrow({
    endpoint: `/teams/${teamId}/principals/${principalId}/policy-tags`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
