import { useQuery } from '@tanstack/react-query'

import getServiceAccounts from '~/queries/getServiceAccounts'

type UseServiceAccountsProps = {
  teamId: string
}

export default function useServiceAccounts({ teamId }: UseServiceAccountsProps) {
  const { data: serviceAccounts = [], isLoading } = useQuery(getServiceAccounts({ teamId }))

  return {
    serviceAccounts,
    isLoading,
  }
}
