import { useSuspenseQuery } from '@tanstack/react-query'

import { getAuthentication } from '~/queries/getAuthentication'

export default function useAuthentication() {
  const { data, ...rest } = useSuspenseQuery(getAuthentication())
  return {
    data,
    rest,
  }
}
