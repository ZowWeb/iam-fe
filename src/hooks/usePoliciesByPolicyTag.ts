import { useQuery } from '@tanstack/react-query'

import { getPoliciesByPolicyTag } from '~/queries/getPoliciesByPolicyTag'

type Args = {
  teamId: string
  policyTagId: string
}

export default function usePoliciesByPolicyTag({ teamId, policyTagId }: Args) {
  const { data: policies = [], isLoading } = useQuery(getPoliciesByPolicyTag({ teamId, policyTagId }))

  return {
    policies,
    isLoading,
  }
}
