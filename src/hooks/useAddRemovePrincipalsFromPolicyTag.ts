import { useMutation, useQueryClient } from '@tanstack/react-query'

import addRemovePrincipalsFromPolicyTag from '~/mutations/addRemovePrincipalsFromPolicyTag'
import { GET_PRINCIPALS_BY_POLICY_TAG } from '~/queries/getPrincipalsByPolicyTag'
import type { PatchPrincipalsFromPolicyTag } from '~/types/data'

type Args = {
  teamId: string
  policyTagId: string
}

export default function useAddRemovePrincipalsFromPolicyTag({ teamId, policyTagId }: Args) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchPrincipalsFromPolicyTag) =>
      addRemovePrincipalsFromPolicyTag({ teamId, policyTagId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PRINCIPALS_BY_POLICY_TAG, { teamId, policyTagId }] }) // Invalidates query to force refetch
    },
  })
}
