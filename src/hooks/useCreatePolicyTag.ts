import { useMutation, useQueryClient } from '@tanstack/react-query'

import createPolicyTag from '~/mutations/createPolicyTag'
import type { PolicyTag } from '~/types/data'

type UseCreatePolicyTagProps = {
  teamId: string
}

export default function useCreatePolicyTag({ teamId }: UseCreatePolicyTagProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PolicyTag) => createPolicyTag({ data, teamId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET_POLICY_TAGS', { teamId }] }) // Invalidates query to force refetch
    },
  })
}
