import { MantineProvider } from '@mantine/core'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import NotFoundPage from '~/pages/NotFoundPage'
import { theme } from '~/styles/theme'

function RootComponent() {
  return (
    <MantineProvider theme={theme}>
      <Outlet />
      <TanStackRouterDevtools />
    </MantineProvider>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  loader: () => ({
    crumbTitle: 'Home / Identity & Access Management',
  }),
})
