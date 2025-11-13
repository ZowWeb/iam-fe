import { useSuspenseQuery } from '@tanstack/react-query'

import { getAuthentication } from '~/queries/getAuthentication'
import type { AuthenticationData } from '~/queries/getAuthentication'

export default function useAuthentication() {
  const { data } = useSuspenseQuery<AuthenticationData>(getAuthentication())
  return {
    data,
  }
}
