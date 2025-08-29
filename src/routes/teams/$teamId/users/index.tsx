import { createFileRoute } from '@tanstack/react-router'

import MembersPage from '~/pages/MembersPage'
import getMembers from '~/queries/getMembers'

export const Route = createFileRoute('/teams/$teamId/users/')({
  component: MembersPage,
  loader: async ({ context: { queryClient } }) => {
    return {
      members: await queryClient.ensureQueryData(getMembers()),
    }
  },
})
