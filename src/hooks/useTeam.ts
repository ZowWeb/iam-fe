import { useQuery } from '@tanstack/react-query'

import getTeam from '~/queries/getTeam'

type UseTeamProps = {
  teamId: string
}

export default function useTeam({ teamId }: UseTeamProps) {
  const { data: team, isLoading } = useQuery(getTeam({ teamId }))

  return {
    team,
    isLoading,
  }
}
