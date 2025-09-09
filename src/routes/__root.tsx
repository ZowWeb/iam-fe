import { MantineProvider, LoadingOverlay } from '@mantine/core'
import { useIsFetching, type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import NotFoundPage from '~/pages/NotFoundPage'
import { theme } from '~/styles/theme'

function RootComponent() {
  const isFetching = useIsFetching()

  return (
    <MantineProvider theme={theme}>
      <LoadingOverlay visible={!!isFetching} zIndex={1000} overlayProps={{ blur: 2 }} />
      <Outlet />
      <TanStackRouterDevtools />
    </MantineProvider>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; isAuthenticated: boolean }>()({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  loader: () => ({
    crumbTitle: 'Home / Identity & Access Management',
  }),
})
