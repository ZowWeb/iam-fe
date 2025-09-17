import { LoadingOverlay } from '@mantine/core'
import { useIsFetching, type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

function RootComponent() {
  const isFetching = useIsFetching()

  return (
    <>
      <LoadingOverlay visible={!!isFetching} zIndex={1000} overlayProps={{ blur: 2 }} />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; isAuthenticated: boolean }>()({
  component: RootComponent,
  loader: () => ({
    crumbTitle: 'Home / Identity & Access Management',
  }),
})
