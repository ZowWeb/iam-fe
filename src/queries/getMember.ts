import { queryOptions } from '@tanstack/react-query'

import type { Member } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'

type GetMemberProps = {
  userId: string
}

export const getMember = ({ userId }: GetMemberProps) =>
  queryOptions<Member | undefined>({
    queryKey: ['GET_MEMBER', { userId }],
    queryFn: async () => {
      try {
        const response = await fetch(`https://iamservice.dev.api.aws.tpd-soe.net/users/${userId}`)
        if (!response.ok) {
          throw new Error(
            `[getMember] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
          )
        }
        return response.json()
      } catch (error) {
        console.error(`[getMember] Error fetching member:`, handleErrorMessage(error))
      }
    },
  })
