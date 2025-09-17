import { queryOptions } from '@tanstack/react-query'

import type { User } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

export const GET_USER_QUERY_KEY = ['GET_USER']

export const getUser = (userId: string) => {
  return queryOptions<User>({
    queryKey: GET_USER_QUERY_KEY,
    queryFn: async () => {
      const response = await apiServerWithThrow({ endpoint: `/users/${userId}` })

      return response.json()
    },
  })
}
