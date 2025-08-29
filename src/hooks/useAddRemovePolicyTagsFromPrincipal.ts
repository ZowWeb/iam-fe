import { useMutation, useQueryClient } from '@tanstack/react-query'

import addRemovePolicyTagsFromPrincipal from '~/mutations/addRemovePolicyTagsFromPrincipal'
import type { PatchPolicyTagsFromPrincipal } from '~/types/data'

type UseAddRemovePolicyTagsFromPrincipalProps = {
  teamId: string
  principalId: string
}

export default function useAddRemovePolicyTagsFromPrincipal({
  teamId,
  principalId,
}: UseAddRemovePolicyTagsFromPrincipalProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchPolicyTagsFromPrincipal) =>
      addRemovePolicyTagsFromPrincipal({ teamId, principalId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET_POLICY_TAGS_BY_PRINCIPAL', { principalId }] }) // Invalidates query to force refetch
    },
  })
}
