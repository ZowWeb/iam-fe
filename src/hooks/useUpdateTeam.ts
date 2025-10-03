import { useMutation, useQueryClient } from '@tanstack/react-query'

import updateTeam from '~/mutations/updateTeam'
import { GET_TEAM } from '~/queries/getTeam'
import type { Team } from '~/types/data'

type Args = {
  teamId: string
}

export default function useUpdateTeam({ teamId }: Args) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Team) => updateTeam({ teamId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TEAM, { teamId }] }) // Invalidates query to force refetch
    },
  })
}
