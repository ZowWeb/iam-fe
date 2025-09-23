import { useQuery } from '@tanstack/react-query'

import { getPrincipalsByPolicyTag } from '~/queries/getPrincipalsByPolicyTag'

type Args = {
  teamId: string
  policyTagId: string
}

export default function usePrincipalsByPolicyTag({ teamId, policyTagId }: Args) {
  const { data, isLoading } = useQuery(getPrincipalsByPolicyTag({ teamId, policyTagId }))

  return {
    users: data?.users || [],
    serviceAccounts: data?.serviceAccounts || [],
    isLoading,
  }
}
