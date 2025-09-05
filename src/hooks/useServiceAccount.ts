import { useQuery } from '@tanstack/react-query'

import { getServiceAccount } from '~/queries/getServiceAccount'

type UseServiceAccountProps = {
  teamId: string
  serviceAccountId: string
}

export default function useServiceAccount({ teamId, serviceAccountId }: UseServiceAccountProps) {
  const { data: serviceAccount, isLoading } = useQuery(getServiceAccount({ teamId, serviceAccountId }))

  return {
    serviceAccount,
    isLoading,
  }
}
