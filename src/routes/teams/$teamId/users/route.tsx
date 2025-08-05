import { createFileRoute, Outlet } from '@tanstack/react-router'

import type { Member } from '~/types/data'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId/users')({
  component: RouteComponent,
  loader: async () => {
    try {
      const members = await fetch('http://localhost:4000/users', {
        method: 'GET',
      }).then<Member[]>(response => response.json())
      return {
        members,
        crumbTitle: 'Members with Existing data!',
      }
    } catch (error) {
      console.error(`[Route /teams/$teamId/users] Error fetching members:`, error)
      return {
        members: [],
        crumbTitle: 'Members with no data!',
      }
    }
  },
})
