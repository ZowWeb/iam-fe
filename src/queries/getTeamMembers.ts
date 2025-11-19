import { queryOptions } from '@tanstack/react-query'

import type { Member } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

export default function getTeamMembers({ teamId }: { teamId: string }) {
  return queryOptions<Member[]>({
    queryKey: ['GET_MEMBERS', { teamId }],
    queryFn: async () => {
      const response = await apiCloudfrontWithThrow({ endpoint: `/teams/${teamId}/users` })

      return response.json()
    },
  })
}
