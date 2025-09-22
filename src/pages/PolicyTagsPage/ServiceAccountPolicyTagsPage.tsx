import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import BasePolicyTagsPage, { type Display } from './BasePolicyTagsPage'
import useServiceAccount from '~/hooks/useServiceAccount'

export default function ServiceAccountPolicyTagsPage() {
  const { teamId, serviceAccountId } = useParams({
    from: '/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/roles/',
  })
  const { serviceAccount, isLoading } = useServiceAccount({ teamId, serviceAccountId })

  const display: Display = useMemo(() => {
    return {
      backTo: 'Back to service account list',
      displayName: serviceAccount?.displayName || 'Service account name',
      headerTitle: 'Assign service account roles',
    }
  }, [serviceAccount])

  if (isLoading || !serviceAccount) return

  return <BasePolicyTagsPage teamId={teamId} principalId={serviceAccountId} display={display} />
}
