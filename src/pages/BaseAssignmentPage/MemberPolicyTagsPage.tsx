import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import usePolicyTags from '~/hooks/usePolicyTags'
import usePolicyTagsByPrincipal from '~/hooks/usePolicyTagsByPrincipal'
import useAddRemovePolicyTagsFromPrincipal from '~/hooks/useAddRemovePolicyTagsFromPrincipal'
import BaseAssignmentPage, { type BaseAssignSchema, type Display } from './BaseAssignmentPage'
import { policyTagColumns } from '~/components/AdvancedTable/shared/columns'
import type { PatchPolicyTagsFromPrincipal, PolicyTag } from '~/types/data'
import useMember from '~/hooks/useMember'

export default function MembertPolicyTagsPage() {
  const { teamId, userId } = useParams({
    from: '/_authenticated/teams/$teamId/users/$userId/roles/',
  })
  const { member } = useMember({ userId })
  const { policyTags: policyTagsAll } = usePolicyTags({ teamId })
  const { policyTags: assignedPolicyTags } = usePolicyTagsByPrincipal({
    teamId,
    principalId: userId,
  })
  const { mutate, isPending } = useAddRemovePolicyTagsFromPrincipal({ teamId, principalId: userId })

  const display: Display = useMemo(() => {
    return {
      backTo: 'Back to member list',
      displayName: member?.displayName || 'Member name',
      headerTitle: 'Assign a member role',
      headerSubtitle: 'Add or remove a role from the list below. Click save to commit the change.',
      badgeSelectedOne: 'Role added',
      badgeRemovedOne: 'Role removed',
      badgeSelectedMany: 'Roles added',
      badgeRemovedMany: 'Roles removed',
    }
  }, [member])

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
