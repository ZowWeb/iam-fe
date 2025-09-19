import { queryOptions } from '@tanstack/react-query'

import type { Member } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

export default function getTeamMembers({ teamId }: { teamId: string }) {
  return queryOptions<Member[]>({
    queryKey: ['GET_MEMBERS', { teamId }],
    queryFn: async () => {
      const response = await apiServerWithThrow({ endpoint: `/teams/${teamId}/users` })

      return response.json()
    },
  })
}
