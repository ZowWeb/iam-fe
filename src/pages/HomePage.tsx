import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

import Layout from '~/components/Layout'
import Typography from '~/components/Typography'
import useAuthentication from '~/hooks/useAuthentication'

export default function HomePage() {
  const { data: result } = useAuthentication()
  const navigate = useNavigate()

  console.info('Login attempt for whoami', { result })

  useEffect(() => {
    console.info('Authentication data changed', JSON.stringify(result))
    if (result && !(typeof result === 'object' && 'error' in result)) {
      console.info('Effect', { result: result.team.id })
      navigate({ to: '/teams/$teamId/profile', params: { teamId: result.team.id } })
    } else {
      console.info('No data found, redirecting to initiate PKCE login')
      const cloudfrontUrl = import.meta.env.VITE_CLOUDFRONT_URL
      window.location.href = `${cloudfrontUrl}/auth/login`
    }
  }, [result])

  return (
    <Layout>
      <Typography.H1>Home</Typography.H1>
    </Layout>
  )
}
