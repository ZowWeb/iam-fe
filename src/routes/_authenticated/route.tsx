import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import AuthenticatedLayout from '~/components/Layout/Authenticated'
import ErrorPage from '~/pages/ErrorPage'
import { getAuthentication } from '~/queries/getAuthentication'

const RouteComponent = () => (
  <AuthenticatedLayout>
    <Outlet />
  </AuthenticatedLayout>
)

const cloudfrontUrl = import.meta.env.VITE_CLOUDFRONT_URL

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    const authData = await queryClient.fetchQuery(getAuthentication())
    if (!authData) {
      throw redirect({
        href: `${cloudfrontUrl}/auth/login`,
      })
    }

    return {
      isAuthenticated: !!authData,
      authData,
    }
  },
  errorComponent: ErrorPage,
  onError: error => {
    console.error('Error in _authenticated route:', error)
    throw redirect({
      href: `${cloudfrontUrl}/auth/login`,
    })
  },
})
