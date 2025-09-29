import { useQuery } from '@tanstack/react-query'

import getPolicyTagsByPrincipal from '~/queries/getPolicyTagsByPrincipal'

type UsePolicyTagsByPrincipalProps = {
  teamId: string
  principalId: string
}

export default function usePolicyTagsByPrincipal({ teamId, principalId }: UsePolicyTagsByPrincipalProps) {
  const { data: policyTags = [], isLoading } = useQuery(getPolicyTagsByPrincipal({ teamId, principalId }))

  return {
    policyTags,
    isLoading,
  }
}
