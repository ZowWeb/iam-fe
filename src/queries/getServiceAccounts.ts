import { queryOptions } from '@tanstack/react-query'

import type { ServiceAccount } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

type GetServiceAccountsProps = {
  teamId: string
}

export default function getServiceAccounts({ teamId }: GetServiceAccountsProps) {
  return queryOptions<ServiceAccount[] | undefined>({
    queryKey: ['GET_SERVICE_ACCOUNTS', { teamId }],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/service-accounts`,
        )
        if (!response.ok) {
          throw new Error(
            `[getServiceAccounts] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getServiceAccounts] Error fetching service accounts:`, handleErrorMessage(error))
      }
    },
  })
}
