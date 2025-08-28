import type { PolicyTag } from '~/types/data'

type CreatePolicyTagProps = {
  teamId: string
  data: PolicyTag
}

export const createPolicyTag = async ({ data, teamId }: CreatePolicyTagProps): Promise<PolicyTag> => {
  const response = await fetch(`https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/policy-tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create policy tag')
  }

  return response.json()
}
