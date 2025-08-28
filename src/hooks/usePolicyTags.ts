import { useQuery } from '@tanstack/react-query'

import { getPolicyTags } from '~/queries/getPolicyTags'

type UsePolicyTagsProps = {
  teamId: string
}

export default function usePolicyTags({ teamId }: UsePolicyTagsProps) {
  const { data: policyTags = [], isLoading } = useQuery(getPolicyTags({ teamId }))

  return {
    policyTags,
    isLoading,
  }
}
