import type { PolicyTag } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  data: PolicyTag
}

export default async function createPolicyTag({ data, teamId }: Args) {
  const response = await apiCloudfrontWithThrow({
    endpoint: `/teams/${teamId}/policy-tags`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json() as Promise<PolicyTag>
}
