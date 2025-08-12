import { createFileRoute, Outlet } from '@tanstack/react-router'

import type { Member } from '~/types/data'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId/users')({
  component: RouteComponent,
  loader: async () => {
    const crumbTitle = 'Members'
    try {
      const members = await fetch('https://iamservice.dev.api.aws.tpd-soe.net/users', {
        method: 'GET',
      }).then<Member[]>(response => response.json())
      return {
        members,
        crumbTitle,
      }
    } catch (error) {
      console.error(`[Route /teams/$teamId/users] Error fetching members:`, error)
      return {
        members: [],
        crumbTitle,
      }
    }
  },
})
