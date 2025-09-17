import { queryOptions } from '@tanstack/react-query'

import type { Member } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

export default function getMembers() {
  return queryOptions<Member[]>({
    queryKey: ['GET_MEMBERS'],
    queryFn: async () => {
      const response = await apiServerWithThrow({ endpoint: '/users' })

      return response.json()
    },
  })
}
