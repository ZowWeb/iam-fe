import { useMutation, useQueryClient } from '@tanstack/react-query'

import addRemovePoliciesFromPolicyTag from '~/mutations/addRemovePoliciesFromPolicyTag'
import { GET_POLICIES_BY_POLICY_TAG } from '~/queries/getPoliciesByPolicyTag'
import type { PatchPoliciesFromPolicyTag } from '~/types/data'

type Args = {
  teamId: string
  policyTagId: string
}

export default function useAddRemovePoliciesFromPolicyTag({ teamId, policyTagId }: Args) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchPoliciesFromPolicyTag) =>
      addRemovePoliciesFromPolicyTag({ teamId, policyTagId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_POLICIES_BY_POLICY_TAG, { teamId, policyTagId }] }) // Invalidates query to force refetch
    },
  })
}
