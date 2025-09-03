import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/teams/$teamId/service-accounts')({
  component: RouteComponent,
  loader: () => ({
    crumbTitle: 'Service accounts',
  }),
})
