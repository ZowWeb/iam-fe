import { useSuspenseQuery } from '@tanstack/react-query'

import { getAuthentication } from '~/queries/getAuthentication'

export default function useAuthentication() {
  const { data, error, isFetching } = useSuspenseQuery(getAuthentication())
  // eslint-disable-next-line no-console
  console.log('useAuthentication error:', error)

  if (!isFetching && error && 'status' in error && error.status === 401) {
    console.info('No data found, redirecting to initiate PKCE login')
    const cloudfrontUrl = import.meta.env.VITE_CLOUDFRONT_URL
    window.location.href = `${cloudfrontUrl}/auth/login`
  }

  return {
    data,
    isAuthenticated: !!data,
  }
}
