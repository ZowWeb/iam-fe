import { useQuery } from '@tanstack/react-query'

import { GET_USER_QUERY_KEY } from '~/queries/getUser'
import { getStoredUser } from '~/utils/auth'

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: GET_USER_QUERY_KEY,
    initialData: getStoredUser,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return {
    user,
    isLoading,
  }
}
