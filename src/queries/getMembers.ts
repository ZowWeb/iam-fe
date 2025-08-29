import { queryOptions } from '@tanstack/react-query'

import type { Member } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

export default function getMembers() {
  return queryOptions<Member[] | undefined>({
    queryKey: ['GET_MEMBERS'],
    queryFn: async () => {
      try {
        const response = await fetch('https://iamservice.dev.api.aws.tpd-soe.net/users')
        if (!response.ok) {
          throw new Error(
            `[getMembers] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getMembers] Error fetching members:`, handleErrorMessage(error))
      }
    },
  })
}
