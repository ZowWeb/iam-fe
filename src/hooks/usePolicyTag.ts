import { useSuspenseQuery } from '@tanstack/react-query'

import getPolicyTag from '~/queries/getPolicyTag'

type Args = {
  teamId: string
  policyTagId: string
}

export default function usePolicyTag({ teamId, policyTagId }: Args) {
  const { data: policyTag, isLoading } = useSuspenseQuery(getPolicyTag({ teamId, policyTagId }))

  return {
    policyTag,
    isLoading,
  }
}
