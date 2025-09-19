import { createFileRoute } from '@tanstack/react-router'

import MembersPage from '~/pages/MembersPage'
import getTeamMembers from '~/queries/getTeamMembers'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/')({
  component: MembersPage,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      members: await queryClient.ensureQueryData(getTeamMembers({ teamId })),
    }
  },
})
