import { useQuery } from '@tanstack/react-query'

import { getAuthentication } from '~/queries/getAuthentication'

export default function useAuthentication() {
  const data = useQuery(getAuthentication())
  return data
}
