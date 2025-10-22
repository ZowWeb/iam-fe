import { createFileRoute } from '@tanstack/react-router'

import ProfilePage from '~/pages/ProfilePage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/profile/')({
  component: ProfilePage,
  loader: async () => {
    return {
      crumbTitle: 'My Profile',
      showNavMenu: false,
    }
  },
})
