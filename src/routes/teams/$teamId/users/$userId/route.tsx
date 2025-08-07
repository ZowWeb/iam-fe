import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/teams/$teamId/users/$userId')({
  component: RouteComponent,
  loader: async () => {
    const username = await new Promise<string>(resolve => {
      setTimeout(resolve, 100)
      resolve('John Doe')
    })

    return {
      crumbTitle: username,
    }
  },
})
