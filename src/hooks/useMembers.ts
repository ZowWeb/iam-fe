import { useQuery } from '@tanstack/react-query'

import getMembers from '~/queries/getMembers'

export default function useMembers() {
  const { data: members = [], isLoading } = useQuery(getMembers())

  return {
    members,
    isLoading,
  }
}
