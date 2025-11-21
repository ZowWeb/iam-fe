import { styled } from '@linaria/react'
import { LoadingOverlay } from '@mantine/core'
import { useIsFetching, type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { hideOnBreakpointsCss } from '~/styles/global'
/**
 * Global styles for the entire app can be added here
 */
const GlobalStylesWrapper = styled.div`
  ${hideOnBreakpointsCss}
`

function RootComponent() {
  const isFetching = useIsFetching()

  return (
    <GlobalStylesWrapper>
      <LoadingOverlay visible={!!isFetching} zIndex={1000} overlayProps={{ blur: 2 }} />
      <Outlet />
      <TanStackRouterDevtools />
    </GlobalStylesWrapper>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  isAuthenticated: boolean
}>()({
  component: RootComponent,
  loader: () => ({
    crumbTitle: 'Home / Identity & Access Management',
  }),
})
