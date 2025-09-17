import { createFileRoute } from '@tanstack/react-router'

import MembersPage from '~/pages/MembersPage'
import getMembers from '~/queries/getMembers'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/')({
  component: MembersPage,
  loader: async ({ context: { queryClient }, params: { teamId } }) => {
    return {
      members: await queryClient.ensureQueryData(getMembers({ teamId })),
    }
  },
})
