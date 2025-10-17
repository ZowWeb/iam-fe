import { createFileRoute } from '@tanstack/react-router'

import ProfilePage from '~/pages/ProfilePage'
import { getMember } from '~/queries/getMember'

export const Route = createFileRoute('/_authenticated/teams/$teamId/profile/')({
  component: ProfilePage,
  loader: async ({ context: { queryClient } }) => {
    const member = await queryClient.ensureQueryData(getMember({ userId: 'dummy' }))

    return {
      member,
      crumbTitle: 'My Profile',
      showNavMenu: false
    }
  },
})
