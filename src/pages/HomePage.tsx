import { useEffect } from 'react'

import Layout from '~/components/Layout'
import Typography from '~/components/Typography'
import useAuthentication from '~/hooks/useAuthentication'

interface HomePageProps {
  isAuthenticated?: boolean
  userName?: string
}

function useAuthFallback(passedIsAuthenticated?: boolean, passedUserName?: string) {
  return {
    isAuthenticated: passedIsAuthenticated ?? false,
    userName: passedUserName,
  }
}

export default function HomePage(props: HomePageProps) {
  const { isAuthenticated, userName } = useAuthFallback(props.isAuthenticated, props.userName)
  const { data, isLoading } = useAuthentication()

  console.info('Login attempt', { isAuthenticated, data, userName })

  useEffect(() => {
    if (!isLoading && !data) {
      console.info('No data found, redirecting to initiate PKCE login')
      window.location.href = 'https://console.apideveloper-dev.verizon.com/auth/login'
    }
  }, [isLoading, data])

  return (
    <Layout>
      <Typography.H1>Home</Typography.H1>
      <Typography.H4>Not authenticated</Typography.H4>
    </Layout>
  )
}
