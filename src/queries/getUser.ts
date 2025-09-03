import { queryOptions } from '@tanstack/react-query'

import type { User } from '~/types/data'

export const GET_USER_QUERY_KEY = ['GET_USER']

export const getUser = (userId: string) => {
  return queryOptions<User | undefined>({
    queryKey: GET_USER_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch(`https://iamservice.dev.api.aws.tpd-soe.net/users/${userId}`)
      if (!response.ok) {
        throw new Error(
          `[getUser] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
        )
      }
      const user = (await response.json()) as User

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    },
  })
}
