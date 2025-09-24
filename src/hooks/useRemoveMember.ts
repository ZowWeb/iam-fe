import { useMutation, useQueryClient } from '@tanstack/react-query'

import removeMember from '~/mutations/removeMember'

type Args = {
  teamId: string
}

export default function useRemoveMember({ teamId }: Args) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => removeMember({ teamId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET_MEMBERS', { teamId }] }) // Invalidates query to force refetch
    },
  })
}
