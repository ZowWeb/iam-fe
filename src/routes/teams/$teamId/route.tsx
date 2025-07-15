import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId')({
  component: RouteComponent,
  loader: () => ({
    crumbTitle: 'Team Overview',
  }),
})
