import { queryOptions } from '@tanstack/react-query'

import type { Member } from '~/types/data'
import apiServerWithThrow from '~/utils/apiServerWithThrow'

export default function getTeamMembers({ teamId }: { teamId: string }) {
  return queryOptions<Member[]>({
    queryKey: ['GET_MEMBERS', { teamId }],
    queryFn: async () => {
      /**
       * TODO: Update endpoint to `/teams/${teamId}/users` when
       * [Jira Issue](https://ctlabs.verizon.net/vztracking/browse/APIFIAM-606) is done
       */
      const response = await apiServerWithThrow({ endpoint: `/users` })

      return response.json()
    },
  })
}
