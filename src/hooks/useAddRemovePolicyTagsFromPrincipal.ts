import { useMutation, useQueryClient } from '@tanstack/react-query'

import addRemovePolicyTagsFromPrincipal from '~/mutations/addRemovePolicyTagsFromPrincipal'
import { GET_POLICY_TAGS_BY_PRINCIPAL } from '~/queries/getPolicyTagsByPrincipal'
import { GET_PRINCIPALS_BY_POLICY_TAG } from '~/queries/getPrincipalsByPolicyTag'
import type { PatchPolicyTagsFromPrincipal } from '~/types/data'

type Args = {
  teamId: string
  principalId: string
}

export default function useAddRemovePolicyTagsFromPrincipal({ teamId, principalId }: Args) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchPolicyTagsFromPrincipal) =>
      addRemovePolicyTagsFromPrincipal({ teamId, principalId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_POLICY_TAGS_BY_PRINCIPAL, { teamId, principalId }] }) // Invalidates query to force refetch
      queryClient.invalidateQueries({ queryKey: [GET_PRINCIPALS_BY_POLICY_TAG, { teamId, principalId }] }) // Invalidates query to force refetch (Role details page)
    },
  })
}
