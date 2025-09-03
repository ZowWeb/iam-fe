import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/teams/$teamId/users')({
  component: RouteComponent,
  loader: () => ({
    crumbTitle: 'Members',
  }),
})
