import { useMutation } from '@tanstack/react-query'

import inviteMembers from '~/mutations/inviteMembers'
import type { InviteMember } from '~/types/data'

type UseInviteMemberProps = {
  teamId: string
}

export default function useInviteMember({ teamId }: UseInviteMemberProps) {
  return useMutation({
    mutationFn: (data: InviteMember) => inviteMembers({ data, teamId }),
  })
}
