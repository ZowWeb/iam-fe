import { useMutation, useQueryClient } from '@tanstack/react-query'

import deleteServiceAccount from '~/mutations/deleteServiceAccount'

type UseDeleteServiceAccountsProps = {
  teamId: string
}

export default function useDeleteServiceAccount({ teamId }: UseDeleteServiceAccountsProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (serviceAccountId: string) => deleteServiceAccount({ teamId, serviceAccountId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET_SERVICE_ACCOUNTS', { teamId }] }) // Invalidates query to force refetch
    },
  })
}
