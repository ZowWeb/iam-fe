import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles/global.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css' // if using mantine date picker features
import 'mantine-react-table/styles.css' // make sure MRT styles were imported in your app root (once)
import './styles/global.css'

import reportWebVitals from './reportWebVitals'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { theme } from './styles/theme'
import NotFoundPage from './pages/NotFoundPage'
import Error from './components/Error'

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

// Create a new router instance
const router = createRouter({
  routeTree,
  basepath: '/iam',
  context: {
    queryClient,
    isAuthenticated: false,
  },
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: Error,
  defaultOnCatch: error => {
    // can be used to log or report errors on Sentry etc
    console.info(`[defaultOnCatch] error:`, error)
  },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
    queryClient: typeof queryClient
    isAuthenticated: boolean
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
