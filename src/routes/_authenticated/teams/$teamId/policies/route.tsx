import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/teams/$teamId/policies')({
  component: RouteComponent,
  loader: () => ({
    crumbTitle: 'Policies',
  }),
})
