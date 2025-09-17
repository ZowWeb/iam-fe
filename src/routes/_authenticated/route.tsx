import { createFileRoute, Outlet } from '@tanstack/react-router'

import AuthenticatedLayout from '~/components/Layout/Authenticated'
import ErrorPage from '~/pages/ErrorPage'
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
  beforeLoad: async ({ context: { queryClient } }) => {
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
        isAuthenticated: false,
      }
    }
    // Get the user data from the cache first
    let user = queryClient.getQueryData(GET_USER_QUERY_KEY) as User | undefined

    if (!user) {
      // If not in cache, check local storage
      user = await queryClient.fetchQuery(getUser({ userId: token.userId }))
    }

    return {
      isAuthenticated: !!user,
    }
  },
  errorComponent: ErrorPage,
})
