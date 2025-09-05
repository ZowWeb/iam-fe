import { queryOptions } from '@tanstack/react-query'

import type { ServiceAccount } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

type GetServiceAccountProps = {
  teamId: string
  serviceAccountId: string
}

export const getServiceAccount = ({ teamId, serviceAccountId }: GetServiceAccountProps) =>
  queryOptions<ServiceAccount | undefined>({
    queryKey: ['GET_SERVICE_ACCOUNT', { serviceAccountId }],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/service-accounts/${serviceAccountId}`,
        )
        if (!response.ok) {
          throw new Error(
            `[getServiceAccount] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getServiceAccount] Error fetching service account:`, handleErrorMessage(error))
      }
    },
  })
