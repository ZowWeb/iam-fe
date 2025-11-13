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
  const { data: result, rest } = useAuthentication()

  console.info('Login attempt for whoami', { result, rest, userName, isAuthenticated })

  useEffect(() => {
    console.info('Authentication data changed', { result })
    if (!result || (typeof result === 'object' && 'error' in result)) {
      console.info('No data found, redirecting to initiate PKCE login')
      window.location.href = 'https://console.apideveloper-dev.verizon.com/auth/login'
    }
  }, [result])

  return (
    <Layout>
      <Typography.H1>Home</Typography.H1>
    </Layout>
  )
}
