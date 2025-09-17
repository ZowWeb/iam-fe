import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles')({
  component: RouteComponent,
  loader: () => ({
    crumbTitle: 'Roles',
  }),
})
