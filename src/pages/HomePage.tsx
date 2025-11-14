import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import Layout from '~/components/Layout'
import Typography from '~/components/Typography'
import useAuthentication from '~/hooks/useAuthentication'
import { Route } from '~/routes'

export default function HomePage() {
  const { data: result } = useAuthentication()
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = Route.useRouteContext()

  console.info('Login attempt for whoami', { result })

  useEffect(() => {
    console.info('Authentication data changed', { result })
    if (result && !(typeof result === 'object' && 'error' in result)) {
      console.info('Effect', { result: result.team.id, isAuthenticated })
      setIsAuthenticated(true)
      console.info('setIsAuthenticated', { isAuthenticated })
      navigate({ to: '/teams/$teamId/profile', params: { teamId: result.team.id } })
    } else {
      console.info('No data found, redirecting to initiate PKCE login')
      window.location.href = 'https://console.apideveloper-dev.verizon.com/auth/login'
    }
  }, [result, setIsAuthenticated])

  return (
    <Layout>
      <Typography.H1>Home</Typography.H1>
    </Layout>
  )
}
