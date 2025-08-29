import { useCallback, useEffect, useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import type {
  MRT_ColumnDef as MRTColumnDef,
  MRT_RowSelectionState as MRTRowSelectionState,
} from 'mantine-react-table'
import { Button } from '@vds/buttons'
import { useParams } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import IamHero from '~/components/IamHero'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/ActionToolbar'
import Table from '~/components/AdvancedTable'
import type { PatchPolicyTagsFromPrincipal, PolicyTag } from '~/types/data'
import Badge from '~/components/Badge'
import { theme } from '~/styles/theme'
import usePolicyTagsByPrincipal from '~/hooks/usePolicyTagsByPrincipal'
import useMember from '~/hooks/useMember'
import usePolicyTags from '~/hooks/usePolicyTags'
import useAddRemovePolicyTagsFromPrincipal from '~/hooks/useAddRemovePolicyTagsFromPrincipal'

const columns: MRTColumnDef<PolicyTag>[] = [
  {
    accessorKey: 'policyTagName',
    header: 'Name',
    size: 100,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 100,
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last updated',
    size: 100,
  },
]

const tableOptions = {
  enableRowSelection: true,
  mantineSelectCheckboxProps: { color: theme.black },
  mantineSelectAllCheckboxProps: { color: theme.black },
}

const assignPoliciesSchema = z
  .object({
    policyTagsToAdd: z.array(z.string()),
    policyTagsToRemove: z.array(z.string()),
  })
  .refine(data => data.policyTagsToAdd.length > 0 || data.policyTagsToRemove.length > 0, {
    message: 'At least one policy must be added or removed.',
  })

type AssignPoliciesSchema = z.infer<typeof assignPoliciesSchema>

const MemberPoliciesPage = () => {
  const { teamId, userId } = useParams({ from: '/teams/$teamId/users/$userId/roles/' })
  const { member } = useMember({ userId })
  const { policyTags: assignedPolicyTags } = usePolicyTagsByPrincipal({
    teamId,
    principalId: userId,
  })
  const { policyTags: policyTagsAll } = usePolicyTags({ teamId })
  const [rowSelection, setRowSelection] = useState<MRTRowSelectionState>({})
  const [initialAssignedPolicyTagsIds, setInitialAssignedPolicyTagsIds] = useState<string[]>([])
  const { mutate } = useAddRemovePolicyTagsFromPrincipal({ teamId, principalId: userId })

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { isValid, isDirty },
  } = useForm<AssignPoliciesSchema>({
    resolver: zodResolver(assignPoliciesSchema),
    mode: 'onChange',
    defaultValues: {
      policyTagsToAdd: [],
      policyTagsToRemove: [],
    },
  })

  // Watch for changes in the form's principals arrays
  const policyTagsToAdd = watch('policyTagsToAdd')
  const policyTagsToRemove = watch('policyTagsToRemove')

  const selectedPoliciesQty = Object.values(rowSelection).filter(Boolean).length // Total selected
  const removedPoliciesQty = policyTagsToRemove.length // Total removed
  const isSaveEnabled = isValid && (policyTagsToAdd.length > 0 || policyTagsToRemove.length > 0) // Check if save button should be enabled

  const setInitialSelectedState = useCallback(() => {
    if (initialAssignedPolicyTagsIds.length > 0) {
      const initialSelection = policyTagsAll.reduce((acc, policy, index) => {
        if (initialAssignedPolicyTagsIds.includes(policy.id)) {
          acc[index] = true
        }
        return acc
      }, {}) // Start with an empty object as the accumulator
      setRowSelection(initialSelection)
    } else {
      setRowSelection({})
    }
  }, [policyTagsAll, initialAssignedPolicyTagsIds])

  const handleCancel = () => {
    reset()
    setInitialSelectedState()
  }

  const onSubmit: SubmitHandler<AssignPoliciesSchema> = data => {
    mutate(data as PatchPolicyTagsFromPrincipal)
  }

  /**
   * useEffect to set the initial selection
   * Mantine react uses { index: true|false } to set the selected rows
   */
  useEffect(() => {
    setInitialSelectedState()
  }, [policyTagsAll, initialAssignedPolicyTagsIds])

  /**
   * useEffect to store the initial state of the assigned roles
   */
  useEffect(() => {
    const assignedPoliciesIds: string[] = assignedPolicyTags.map(p => p.id)
    setInitialAssignedPolicyTagsIds(assignedPoliciesIds)
  }, [assignedPolicyTags])

  // Effect to update the form's add/remove arrays based on rowSelection changes
  useEffect(() => {
    // This effect should only run after initial data has been loaded and rowSelection has been set
    if (!policyTagsAll.length) return

    const newSelectedIds = new Set(
      Object.keys(rowSelection)
        .filter(key => rowSelection[parseInt(key, 10)])
        .map(key => policyTagsAll[parseInt(key, 10)].id),
    )

    const toAdd: string[] = []
    const toRemove: string[] = []

    policyTagsAll.forEach(policy => {
      const isCurrentlySelected = newSelectedIds.has(policy.id)
      const wasInitiallyAssigned = initialAssignedPolicyTagsIds.includes(policy.id)

      if (isCurrentlySelected && !wasInitiallyAssigned) {
        toAdd.push(policy.id)
      } else if (!isCurrentlySelected && wasInitiallyAssigned) {
        toRemove.push(policy.id)
      }
    })

    // Update the form values
    setValue('policyTagsToAdd', toAdd)
    setValue('policyTagsToRemove', toRemove)
    trigger()
  }, [rowSelection, policyTagsAll, initialAssignedPolicyTagsIds, setValue])

  return (
    <>
      <Link to="..">
        <FlexBox customStyle={{ marginBottom: '2rem' }}>
          <IconChevronLeft name="arrow-left" size={20} />
          <span>Back to member list</span>
        </FlexBox>
      </Link>
      <FlexBox direction="column" gap="2.5rem">
        <TitleLockup
          data={{
            title: {
              size: 'titleLarge',
              bold: false,
              children: 'Assign a member role',
              color: COLORS.brandHighlight,
            },
            subtitle: {
              size: 'bodyLarge',
              children: 'Add or remove a policy from the list bellow. Click save to commit the change.',
            },
          }}
        />
        <IamHero title={member?.displayName || 'Member name'} showActionButton={false} gap="0">
          <FlexBox direction="column" alignItems="flex-start" gap="1rem">
            <div>{member?.email}</div>
            <FlexBox alignItems="flex-end">
              <FlexBox gap="0.5rem">
                {selectedPoliciesQty > 0 && (
                  <Badge
                    text={`${selectedPoliciesQty} ${selectedPoliciesQty === 1 ? 'Policy' : 'Policies'} assigned`}
                    color="blue"
                  />
                )}
                {removedPoliciesQty > 0 && (
                  <Badge
                    text={`${removedPoliciesQty} ${removedPoliciesQty === 1 ? 'Policy' : 'Policies'} removed`}
                    color="yellow"
                  />
                )}
              </FlexBox>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FlexBox justifyContent="end" alignItems="flex-end" gap="1rem">
                  <Button size="small" type="submit" disabled={!isSaveEnabled}>
                    Save
                  </Button>
                  <Button size="small" use="secondary" type="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                </FlexBox>
              </form>
            </FlexBox>
          </FlexBox>
        </IamHero>
        <ActionToolbar />
        <Table
          {...{
            columns,
            data: policyTagsAll,
            rowSelection,
            onRowSelectionChange: setRowSelection,
            ...tableOptions,
          }}
        />
      </FlexBox>
      {JSON.stringify({ isValid, isDirty })}
    </>
  )
}

export default MemberPoliciesPage
