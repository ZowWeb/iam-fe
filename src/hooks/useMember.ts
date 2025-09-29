import { useQuery } from '@tanstack/react-query'

import { getMember } from '~/queries/getMember'

type UseMemberProps = {
  userId: string
}

export default function useMember({ userId }: UseMemberProps) {
  const { data: member, isLoading } = useQuery(getMember({ userId }))

  return {
    member,
    isLoading,
  }
}
