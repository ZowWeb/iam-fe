import { createFileRoute, Outlet } from '@tanstack/react-router'

import AuthenticatedLayout from '~/components/Layout/Authenticated'

const RouteComponent = () => (
  <AuthenticatedLayout>
    <Outlet />
  </AuthenticatedLayout>
)

export const Route = createFileRoute('/teams/$teamId')({
  component: RouteComponent,
  loader: () => ({
    crumbTitle: 'Team Overview',
  }),
})
