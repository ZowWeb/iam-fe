import { queryOptions } from '@tanstack/react-query'

import type { ServiceAccount } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
}

export default function getServiceAccounts({ teamId }: Args) {
  return queryOptions<ServiceAccount[]>({
    queryKey: ['GET_SERVICE_ACCOUNTS', { teamId }],
    queryFn: async () => {
      const response = await apiCloudfrontWithThrow({
        endpoint: `/teams/${teamId}/service-accounts`,
      })

      return response.json()
    },
  })
}
