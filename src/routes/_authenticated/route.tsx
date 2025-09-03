import { createFileRoute, Outlet } from '@tanstack/react-router'

import AuthenticatedLayout from '~/components/Layout/Authenticated'
import { GET_USER_QUERY_KEY, getUser } from '~/queries/getUser'
import type { User } from '~/types/data'
import { getUserToken } from '~/utils/auth'

const RouteComponent = () => (
  <AuthenticatedLayout>
    <Outlet />
  </AuthenticatedLayout>
)

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { queryClient } = context
    const token = getUserToken()
    if (!token || token.isExpired) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // throw redirect({
      //   to: '/login',
      //   search: {
      //     // Use the current location to power a redirect after login
      //     // (Do not use `router.state.resolvedLocation` as it can
      //     // potentially lag behind the actual current location)
      //     redirect: location.href,
      //   },
      // })
      return {
        ...context,
        isAuthenticated: false,
      }
    }
    // Get the user data from the cache first
    let user = queryClient.getQueryData(GET_USER_QUERY_KEY) as User | undefined

    if (!user) {
      // If not in cache, check local storage
      try {
        user = await queryClient.fetchQuery(getUser(token.userId))
      } catch (error) {
        console.error(`[beforeLoad] Error fetching user:`, error)
        return context
      }
    }

    return {
      ...context,
      isAuthenticated: true,
    }
  },
})
