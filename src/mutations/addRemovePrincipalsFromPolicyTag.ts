import type { PatchPrincipalsFromPolicyTag } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyTagId: string
  data: PatchPrincipalsFromPolicyTag
}

/**
 * Add or remove policy tags attached to a principal
 */
export default async function addRemovePrincipalsFromPolicyTag({
  data,
  teamId,
  policyTagId,
}: Args): Promise<PatchPrincipalsFromPolicyTag> {
  const response = await apiServerWithThrow({
    endpoint: `/teams/${teamId}/policy-tags/${policyTagId}/principals`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
