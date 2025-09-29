import { queryOptions } from '@tanstack/react-query'

import type { Member } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

type GetMemberProps = {
  userId: string
}

export const getMember = ({ userId }: GetMemberProps) =>
  queryOptions<Member>({
    queryKey: ['GET_MEMBER', { userId }],
    queryFn: async () => {
      const response = await apiServerWithThrow({ endpoint: `/users/${userId}` })

      return response.json()
    },
  })
