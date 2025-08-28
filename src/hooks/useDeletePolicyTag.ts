import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deletePolicyTag } from '~/mutations/deletePolicyTag'

type UseDeletePolicyTagProps = {
  teamId: string
}

export default function useDeletePolicyTag({ teamId }: UseDeletePolicyTagProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (policyTagId: string) => deletePolicyTag({ teamId, policyTagId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET_POLICY_TAGS', { teamId }] }) // Invalidates query to force refetch
    },
  })
}
