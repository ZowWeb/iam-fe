import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import BaseAssignmentPage, { type BaseAssignSchema, type Display } from './BaseAssignmentPage'
import { policyColumns } from '~/components/AdvancedTable/shared/columns'
import type { PatchPoliciesFromPolicyTag, Policy } from '~/types/data'
import usePolicyTag from '~/hooks/usePolicyTag'
import usePoliciesByPolicyTag from '~/hooks/usePoliciesByPolicyTag'
import usePolicies from '~/hooks/usePolicies'
import useAddRemovePoliciesFromPolicyTag from '~/hooks/useAddRemovePoliciesFromPolicyTag'

export default function PolicyTagPoliciesPage() {
  const { teamId, policyTagId } = useParams({
    from: '/_authenticated/teams/$teamId/roles/$policyTagId/policies/',
  })
  const { policyTag } = usePolicyTag({ teamId, policyTagId })
  const { policies: policiesAll } = usePolicies({ teamId })
  const { policies: assignedPolicies } = usePoliciesByPolicyTag({ teamId, policyTagId })
  const { mutate, isPending } = useAddRemovePoliciesFromPolicyTag({ teamId, policyTagId })

  const display: Display = useMemo(() => {
    return {
      backTo: 'Back to role list',
      displayName: policyTag.policyTagName || 'Role name',
      headerTitle: 'Assign policies for this role',
      headerSubtitle: 'Add or remove a policy from the list below. Click save to commit the change.',
      badgeSelectedOne: 'Policy added',
      badgeRemovedOne: 'Policy removed',
      badgeSelectedMany: 'Policies assigned',
      badgeRemovedMany: 'Policies removed',
    }
  }, [policyTag])

  const data = useMemo(() => {
    return {
      all: policiesAll,
      assigned: assignedPolicies,
    }
  }, [policiesAll, assignedPolicies])

  const mapToTargetFields = (data: BaseAssignSchema) => {
    const { elementsToAdd: policiesToAdd, elementsToRemove: policiesToRemove } = data
    return { policiesToAdd, policiesToRemove } as PatchPoliciesFromPolicyTag
  }

  return (
    <BaseAssignmentPage<Policy, PatchPoliciesFromPolicyTag>
      columns={policyColumns}
      display={display}
      data={data}
      mutateFn={mutate}
      mappingFn={mapToTargetFields}
      mutateIsPending={isPending}
    />
  )
}
