import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId/users')({
  component: RouteComponent,
  loader: () => ({
    crumbTitle: 'Members',
  }),
})
