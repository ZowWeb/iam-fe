import { queryOptions } from '@tanstack/react-query'

import type { ServiceAccount } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  serviceAccountId: string
}

export const fetchServiceAccount = async ({ teamId, serviceAccountId }: Args) => {
  const response = await apiServerWithThrow({
    endpoint: `/teams/${teamId}/service-accounts/${serviceAccountId}`,
  })

  return response.json()
}

export const getServiceAccount = ({ teamId, serviceAccountId }: Args) =>
  queryOptions<ServiceAccount>({
    queryKey: ['GET_SERVICE_ACCOUNT', { serviceAccountId }],
    queryFn: async () => fetchServiceAccount({ teamId, serviceAccountId }),
  })
