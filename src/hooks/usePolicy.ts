import { useQuery } from '@tanstack/react-query'

import { getPolicy } from '~/queries/getPolicy'

type UsePolicyProps = {
  teamId: string
  policyId: string
}

export default function usePolicy({ teamId, policyId }: UsePolicyProps) {
  const { data: policy, isLoading } = useQuery(getPolicy({ teamId, policyId }))

  return {
    policy,
    isLoading,
  }
}
