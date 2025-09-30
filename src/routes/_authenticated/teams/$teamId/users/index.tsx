import { createFileRoute } from '@tanstack/react-router'

import MembersPage from '~/pages/MembersPage'
import getTeamMembers from '~/queries/getTeamMembers'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/')({
  component: MembersPage,
  loader: ({ context: { queryClient }, params: { teamId } }) => {
    queryClient.ensureQueryData(getTeamMembers({ teamId }))
  },
})
