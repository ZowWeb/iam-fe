import type { PatchPolicyTagsFromPrincipal, PolicyTag } from '~/types/data'

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
  const response = await fetch(
    `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/principals/${principalId}/policy-tags`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to assign policy tags')
  }

  return response.json()
}
