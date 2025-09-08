import { useSuspenseQuery } from '@tanstack/react-query'

import { getPolicies } from '~/queries/getPolicies'

type UsePoliciesProps = {
  teamId: string
}

export default function usePolicies({ teamId }: UsePoliciesProps) {
  const { data: policies = [], isLoading } = useSuspenseQuery(getPolicies({ teamId }))

  return {
    policies,
    isLoading,
  }
}
