import { useQuery } from '@tanstack/react-query'

import { getPoliciesByPolicyTag } from '~/queries/getPoliciesByPolicyTag'

type UsePolicyByPolicyTagProps = {
  teamId: string
  policyTagId: string
}

export default function usePolicyByPolicyTag({ teamId, policyTagId }: UsePolicyByPolicyTagProps) {
  const { data: policies = [], isLoading } = useQuery(getPoliciesByPolicyTag({ teamId, policyTagId }))

  return {
    policies,
    isLoading,
  }
}
