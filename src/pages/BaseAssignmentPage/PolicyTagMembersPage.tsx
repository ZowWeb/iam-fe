import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import BaseAssignmentPage, { type BaseAssignSchema, type Display } from './BaseAssignmentPage'
import { memberColumns } from '~/components/AdvancedTable/shared/columns'
import type { Member, PatchPrincipalsFromPolicyTag } from '~/types/data'
import usePolicyTag from '~/hooks/usePolicyTag'
import useMembers from '~/hooks/withSuspense/useMembers'
import usePrincipalsByPolicyTag from '~/hooks/usePrincipalsByPolicyTag'
import useAddRemovePrincipalsFromPolicyTag from '~/hooks/useAddRemovePrincipalsFromPolicyTag'

export default function PolicyTagMembersPage() {
  const { teamId, policyTagId } = useParams({
    from: '/_authenticated/teams/$teamId/roles/$policyTagId/members/',
  })
  const { policyTag } = usePolicyTag({ teamId, policyTagId })
  const { members: membersAll } = useMembers({ teamId })
  const { users: assignedMembers } = usePrincipalsByPolicyTag({ teamId, policyTagId })
  const { mutate, isPending } = useAddRemovePrincipalsFromPolicyTag({ teamId, policyTagId })

  const display: Display = useMemo(() => {
    return {
      backTo: 'Back to role list',
      displayName: policyTag.policyTagName || 'Role name',
      headerTitle: 'Apply to members',
      headerSubtitle: 'Add or remove a member from the list below. Click save to commit the change.',
      badgeSelectedOne: 'Member applied',
      badgeRemovedOne: 'Member removed',
      badgeSelectedMany: 'Members applied',
      badgeRemovedMany: 'Members removed',
    }
  }, [policyTag])

  const data = useMemo(() => {
    return {
      all: membersAll,
      assigned: assignedMembers,
    }
  }, [membersAll, assignedMembers])

  const mapToTargetFields = (data: BaseAssignSchema) => {
    const { elementsToAdd: principalsToAdd, elementsToRemove: principalsToRemove } = data
    return { principalsToAdd, principalsToRemove } as PatchPrincipalsFromPolicyTag
  }

  return (
    <BaseAssignmentPage<Member, PatchPrincipalsFromPolicyTag>
      columns={memberColumns}
      display={display}
      data={data}
      mutateFn={mutate}
      mappingFn={mapToTargetFields}
      mutateIsPending={isPending}
    />
  )
}
