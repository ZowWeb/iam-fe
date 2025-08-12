import { useQuery } from '@tanstack/react-query'

import { getMembers } from '~/queries/getMembers'
import type { Member } from '~/types/data'

export default function useMembers() {
  const { data: members, isLoading, isError } = useQuery(getMembers)

  if (isError || !members) {
    console.error('Error fetching members or no members found')
    return {
      members: [] as Member[],
      isLoading,
      isError: true,
    }
  }

  return {
    members,
    isLoading,
    isError: false,
  }
}
