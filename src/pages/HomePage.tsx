import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import Layout from '~/components/Layout'
import Typography from '~/components/Typography'
import useAuthentication from '~/hooks/useAuthentication'

export default function HomePage() {
  const { data: result, isAuthenticated } = useAuthentication()
  const navigate = useNavigate()

  console.info('Login attempt for whoami', { result })

  useEffect(() => {
    console.info('Authentication data changed', JSON.stringify(result))
    if (isAuthenticated) {
      console.info('Effect', { result: result.team.id })
      navigate({ to: '/teams/$teamId/profile', params: { teamId: result.team.id } })
    }
  }, [isAuthenticated])

  return (
    <Layout>
      <Typography.H1>Home</Typography.H1>
    </Layout>
  )
}
