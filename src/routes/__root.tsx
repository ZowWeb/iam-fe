import { MantineProvider } from '@mantine/core'
import { createRootRoute, Outlet } from '@tanstack/react-router'

import Layout from '~/components/Layout'
import NotFoundPage from '~/pages/NotFoundPage'
import { theme } from '~/styles/theme'

function RootComponent() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Layout>
        <Outlet />
      </Layout>
    </MantineProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})
