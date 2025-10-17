import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import useServiceAccount from '~/hooks/useServiceAccount'
import usePolicyTags from '~/hooks/usePolicyTags'
import usePolicyTagsByPrincipal from '~/hooks/usePolicyTagsByPrincipal'
import useAddRemovePolicyTagsFromPrincipal from '~/hooks/useAddRemovePolicyTagsFromPrincipal'
import BaseAssignmentPage, { type BaseAssignSchema, type Display } from './BaseAssignmentPage'
import { policyTagColumns } from '~/components/AdvancedTable/shared/columns'
import type { PatchPolicyTagsFromPrincipal, PolicyTag } from '~/types/data'

export default function ServiceAccountPolicyTagsPage() {
  const { teamId, serviceAccountId } = useParams({
    from: '/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/roles/',
  })
  const { serviceAccount } = useServiceAccount({ teamId, serviceAccountId })
  const { policyTags: policyTagsAll } = usePolicyTags({ teamId })
  const { policyTags: assignedPolicyTags } = usePolicyTagsByPrincipal({
    teamId,
    principalId: serviceAccountId,
  })
  const { mutate, isPending } = useAddRemovePolicyTagsFromPrincipal({ teamId, principalId: serviceAccountId })

  const display: Display = useMemo(() => {
    return {
      backTo: 'Back to service account list',
      displayName: serviceAccount?.displayName || 'Service account name',
      headerTitle: 'Assign service account roles',
      headerSubtitle: 'Add or remove a role from the list below. Click save to commit the change.',
      badgeSelectedOne: 'Role added',
      badgeRemovedOne: 'Role removed',
      badgeSelectedMany: 'Roles added',
      badgeRemovedMany: 'Roles removed',
    }
  }, [serviceAccount])

  const data = useMemo(() => {
    return {
      all: policyTagsAll,
      assigned: assignedPolicyTags,
    }
  }, [policyTagsAll, assignedPolicyTags])

  const mapToTargetFields = (data: BaseAssignSchema) => {
    const { elementsToAdd: policyTagsToAdd, elementsToRemove: policyTagsToRemove } = data
    return { policyTagsToAdd, policyTagsToRemove } as PatchPolicyTagsFromPrincipal
  }

  return (
    <BaseAssignmentPage<PolicyTag, PatchPolicyTagsFromPrincipal>
      columns={policyTagColumns}
      display={display}
      data={data}
      mutateFn={mutate}
      mappingFn={mapToTargetFields}
      mutateIsPending={isPending}
    />
  )
}
