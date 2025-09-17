import { useQuery } from '@tanstack/react-query'

import getMembers from '~/queries/getMembers'

type UseMembersProps = {
  teamId: string
}

export default function useMembers({ teamId }: UseMembersProps) {
  const { data: members = [], isLoading } = useQuery(getMembers({ teamId }))

  return {
    members,
    isLoading,
  }
}
