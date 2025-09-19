import { useSuspenseQuery } from '@tanstack/react-query'

import getTeamMembers from '~/queries/getTeamMembers'

type UseMembersProps = {
  teamId: string
}

export default function useMembers({ teamId }: UseMembersProps) {
  const { data: members, isLoading } = useSuspenseQuery(getTeamMembers({ teamId }))

  return {
    members,
    isLoading,
  }
}
