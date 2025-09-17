import type { ServiceAccount } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  data: ServiceAccount
}

export default async function createServiceAccount({ data, teamId }: Args) {
  const response = await apiServerWithThrow({
    endpoint: `/teams/${teamId}/service-accounts`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json() as Promise<ServiceAccount>
}
