import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import BaseAssignmentPage, { type BaseAssignSchema, type Display } from './BaseAssignmentPage'
import { serviceAccountColumns } from '~/components/AdvancedTable/shared/columns'
import type { PatchPrincipalsFromPolicyTag, ServiceAccount } from '~/types/data'
import usePolicyTag from '~/hooks/usePolicyTag'
import useServiceAccounts from '~/hooks/useServiceAccounts'
import usePrincipalsByPolicyTag from '~/hooks/usePrincipalsByPolicyTag'
import useAddRemovePrincipalsFromPolicyTag from '~/hooks/useAddRemovePrincipalsFromPolicyTag'

export default function PolicyTagServiceAccountsPage() {
  const { teamId, policyTagId } = useParams({
    from: '/_authenticated/teams/$teamId/roles/$policyTagId/service-accounts/',
  })
  const { policyTag } = usePolicyTag({ teamId, policyTagId })
  const { serviceAccounts: serviceAccountsAll } = useServiceAccounts({ teamId })
  const { serviceAccounts: assignedServiceAccounts } = usePrincipalsByPolicyTag({ teamId, policyTagId })
  const { mutate, isPending } = useAddRemovePrincipalsFromPolicyTag({ teamId, policyTagId })

  const display: Display = useMemo(() => {
    return {
      backTo: 'Back to role list',
      displayName: policyTag.policyTagName || 'Role name',
      headerTitle: 'Apply to service accounts',
      headerSubtitle: 'Add or remove a service account from the list below. Click save to commit the change.',
      badgeSelectedOne: 'Service account applied',
      badgeRemovedOne: 'Service account removed',
      badgeSelectedMany: 'Service account assigned',
      badgeRemovedMany: 'Service accounts removed',
    }
  }, [policyTag])

  const data = useMemo(() => {
    return {
      all: serviceAccountsAll,
      assigned: assignedServiceAccounts,
    }
  }, [serviceAccountsAll, assignedServiceAccounts])

  const mapToTargetFields = (data: BaseAssignSchema) => {
    const { elementsToAdd: principalsToAdd, elementsToRemove: principalsToRemove } = data
    return { principalsToAdd, principalsToRemove } as PatchPrincipalsFromPolicyTag
  }

  return (
    <BaseAssignmentPage<ServiceAccount, PatchPrincipalsFromPolicyTag>
      columns={serviceAccountColumns}
      display={display}
      data={data}
      mutateFn={mutate}
      mappingFn={mapToTargetFields}
      mutateIsPending={isPending}
    />
  )
}
