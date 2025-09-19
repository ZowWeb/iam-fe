import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import type { MRT_RowSelectionState as MRTRowSelectionState } from 'mantine-react-table'
import { Button } from '@vds/buttons'
import { useParams } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Notification } from '@vds/notifications'

import IamHero from '~/components/IamHero'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/ActionToolbar'
import Table from '~/components/AdvancedTable'
import type { PatchPolicyTagsFromPrincipal, PolicyTag } from '~/types/data'
import Badge from '~/components/Badge'
import { theme } from '~/styles/theme'
import useMember from '~/hooks/useMember'
import usePolicyTags from '~/hooks/usePolicyTags'
import useAddRemovePolicyTagsFromPrincipal from '~/hooks/useAddRemovePolicyTagsFromPrincipal'
import { handleErrorMessage } from '~/utils/errors'
import { policyTagColumns } from '~/components/AdvancedTable/shared/columns'

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

type Props = {
  entity: 'member' | 'service account'
}

const assignedPolicyTags: PolicyTag[] = []

/**
 * Page to assign roles (policy tags) to a member or service account
 */
export default function PrincipalPolicyTagsPage({ entity }: Props) {
  const { teamId, userId } = useParams({ from: '/_authenticated/teams/$teamId/users/$userId/roles/' })
  const { member } = useMember({ userId })
  /**  Uncomment when APIFIAM-606 is ready
  const { policyTags: assignedPolicyTags } = usePolicyTagsByPrincipal({
    teamId,
    principalId: userId,
  })
   */
  const { policyTags: policyTagsAll } = usePolicyTags({ teamId })
  const [rowSelection, setRowSelection] = useState<MRTRowSelectionState>({})
  const { mutate, isPending } = useAddRemovePolicyTagsFromPrincipal({ teamId, principalId: userId })
  const [notificationConfig, setNotificationConfig] = useState<{
    opened: boolean
    type?: 'success' | 'error' | 'info' | 'warning'
    title: string
    subtitle?: string
  }>({
    opened: false,
    title: '',
  })

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { isValid },
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
  const isSaveEnabled = useMemo(
    () => !isPending && isValid && (policyTagsToAdd.length > 0 || policyTagsToRemove.length > 0),
    [isPending, isValid, policyTagsToAdd, policyTagsToRemove],
  )

  /**
   * Returns the initial selection
   * Mantine react uses { index: true|false } to set the selected rows
   */
  const setInitialSelectedState = useCallback(() => {
    if (assignedPolicyTags.length > 0) {
      const initialSelection = policyTagsAll.reduce<MRTRowSelectionState>((acc, policy, index) => {
        if (assignedPolicyTags.some(p => p.id === policy.id)) {
          acc[index] = true
        }
        return acc
      }, {}) // Start with an empty object as the accumulator
      setRowSelection(initialSelection)
    } else {
      setRowSelection({})
    }
  }, [policyTagsAll, assignedPolicyTags])

  const handleCancel = () => {
    reset()
    setInitialSelectedState()
  }

  const onSubmit: SubmitHandler<AssignPoliciesSchema> = data => {
    mutate(data as PatchPolicyTagsFromPrincipal, {
      onSuccess: () =>
        setNotificationConfig({
          opened: true,
          type: 'success',
          title: 'Roles updated succesfully',
        }),
      onError: err =>
        setNotificationConfig({
          opened: true,
          type: 'error',
          title: handleErrorMessage(err),
        }),
    })
  }

  /**
   * useEffect to set the initial state
   */
  useEffect(() => {
    setInitialSelectedState()
  }, [policyTagsAll, assignedPolicyTags])

  /**
   * Effect to update the form's add/remove arrays based on rowSelection changes
   */
  useEffect(() => {
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
      const wasInitiallyAssigned = assignedPolicyTags.some(p => p.id === policy.id)

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
  }, [rowSelection, policyTagsAll, assignedPolicyTags, setValue])

  return (
    <FlexBox direction="column" alignItems="flex-start" gap="2.5rem">
      <Link to="..">
        <FlexBox>
          <IconChevronLeft size={20} />
          <span>{`Back to ${entity} list`}</span>
        </FlexBox>
      </Link>
      {notificationConfig.opened && (
        <Notification
          type={notificationConfig.type}
          title={notificationConfig.title}
          subtitle={notificationConfig.subtitle}
          onCloseButtonClick={() => setNotificationConfig({ ...notificationConfig, opened: false })}
        />
      )}
      <TitleLockup
        data={{
          title: {
            size: 'titleLarge',
            bold: false,
            children: `Assign a ${entity} role`,
            color: COLORS.brandHighlight,
          },
          subtitle: {
            size: 'bodyLarge',
            children: 'Add or remove roles from the list below. Click save to commit the change.',
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
          columns: policyTagColumns,
          data: policyTagsAll,
          rowSelection,
          onRowSelectionChange: setRowSelection,
          ...tableOptions,
        }}
      />
    </FlexBox>
  )
}
