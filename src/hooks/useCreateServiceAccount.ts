import { useMutation, useQueryClient } from '@tanstack/react-query'

import createServiceAccount from '~/mutations/createServiceAccount'
import type { ServiceAccount } from '~/types/data'

type UseCreateServiceAccountsProps = {
  teamId: string
}

export default function useCreateServiceAccount({ teamId }: UseCreateServiceAccountsProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ServiceAccount) => createServiceAccount({ data, teamId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET_SERVICE_ACCOUNTS', { teamId }] }) // Invalidates query to force refetch
    },
  })
}
