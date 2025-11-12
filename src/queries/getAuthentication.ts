import { queryOptions } from '@tanstack/react-query'

import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

export const getAuthentication = () =>
  queryOptions<unknown>({
    queryKey: ['WHOAMI', {}],
    queryFn: async () => {
      const response = await apiCloudfrontWithThrow({ endpoint: `/api/proxy/oauth2/v3/whoami` })
      return response.json()
    },
  })
