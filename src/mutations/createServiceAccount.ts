import type { ServiceAccount } from '~/types/data'

type CreateServiceAccountProps = {
  teamId: string
  data: ServiceAccount
}

export default async function createServiceAccount({
  data,
  teamId,
}: CreateServiceAccountProps): Promise<ServiceAccount> {
  const response = await fetch(
    `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/service-accounts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to create service account')
  }

  return response.json()
}
