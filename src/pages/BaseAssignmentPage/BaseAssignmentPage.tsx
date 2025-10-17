import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import type {
  MRT_RowSelectionState as MRTRowSelectionState,
  MRT_ColumnDef as MRTColumnDef,
} from 'mantine-react-table'
import { Button } from '@vds/buttons'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Notification } from '@vds/notifications'
import type { UseMutateFunction } from '@tanstack/react-query'

import Hero from '~/components/Hero'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/ActionToolbar'
import Table from '~/components/AdvancedTable'
import type {
  Member,
  PatchPoliciesFromPolicyTag,
  PatchPolicyTagsFromPrincipal,
  PatchPrincipalsFromPolicyTag,
  Policy,
  PolicyTag,
  ServiceAccount,
} from '~/types/data'
import Badge from '~/components/Badge'
import { theme } from '~/styles/theme'
import { handleErrorMessage } from '~/utils/errors'

const tableOptions = {
  enableRowSelection: true,
  mantineSelectCheckboxProps: { color: theme.black },
  mantineSelectAllCheckboxProps: { color: theme.black },
}

const baseAssignSchema = z
  .object({
    elementsToAdd: z.array(z.string()),
    elementsToRemove: z.array(z.string()),
  })
  .refine(data => data.elementsToAdd.length > 0 || data.elementsToRemove.length > 0, {
    message: 'At least one element must be added or removed.',
  })

export type BaseAssignSchema = z.infer<typeof baseAssignSchema>

/**
 * Display labels related to the principal
 */
export type Display = {
  backTo: string
  headerTitle: string
  headerSubtitle: string
  displayName: string
  displayEmail?: string
  badgeSelectedOne: string
  badgeSelectedMany: string
  badgeRemovedOne: string
  badgeRemovedMany: string
}

type Props<
  T extends Member | Policy | PolicyTag | ServiceAccount,
  TPatch extends PatchPoliciesFromPolicyTag | PatchPolicyTagsFromPrincipal | PatchPrincipalsFromPolicyTag,
> = {
  columns: MRTColumnDef<T>[]
  data: {
    all: T[]
    assigned: T[]
  }
  mutateFn: UseMutateFunction<TPatch, Error, TPatch, unknown>
  mappingFn: (data: BaseAssignSchema) => TPatch
  mutateIsPending: boolean
  display: Display
}

/**
 * Base page to manage the relation among roles, members, policies or service accounts
 * @param T type for the lists assigned and all elements
 * @param TPatch is the object type for the PATCH API
 * @param columns table columns
 * @param data arrays with assigned and all elements
 * @param mutateFn mutation function to execute when saving changes
 * @param mappingFn it is called to pass the correct object to the mutateFn when saving changes
 * @param mutateIsPending the pending status of the mutation fn
 * @param display display strings
 * @returns
 */
export default function BaseAssignmentPage<
  T extends Member | Policy | PolicyTag | ServiceAccount,
  TPatch extends PatchPoliciesFromPolicyTag | PatchPolicyTagsFromPrincipal | PatchPrincipalsFromPolicyTag,
>({ columns, data, display, mutateFn, mappingFn, mutateIsPending }: Props<T, TPatch>) {
  const [rowSelection, setRowSelection] = useState<MRTRowSelectionState>({})

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
  } = useForm<BaseAssignSchema>({
    resolver: zodResolver(baseAssignSchema),
    mode: 'onChange',
    defaultValues: {
      elementsToAdd: [],
      elementsToRemove: [],
    },
  })

  // Watch for changes in the form's principals arrays
  const elementsToAdd = watch('elementsToAdd')
  const elementsToRemove = watch('elementsToRemove')

  const selectedPoliciesQty = Object.values(rowSelection).filter(Boolean).length // Total selected
  const removedPoliciesQty = elementsToRemove.length // Total removed
  const isSaveEnabled = useMemo(
    () => !mutateIsPending && isValid && (elementsToAdd.length > 0 || elementsToRemove.length > 0),
    [mutateIsPending, isValid, elementsToAdd, elementsToRemove],
  )

  /**
   * Returns the initial selection
   * Mantine react uses { index: true|false } to set the selected rows
   */
  const setInitialSelectedState = useCallback(() => {
    if (data.assigned.length > 0) {
      const initialSelection = data.all.reduce<MRTRowSelectionState>((acc, element, index) => {
        if (data.assigned.some(p => p.id === element.id)) {
          acc[index] = true
        }
        return acc
      }, {}) // Start with an empty object as the accumulator
      setRowSelection(initialSelection)
    } else {
      setRowSelection({})
    }
  }, [data.all, data.assigned])

  const handleCancel = () => {
    reset()
    setInitialSelectedState()
  }

  const onSubmit: SubmitHandler<BaseAssignSchema> = data => {
    mutateFn(mappingFn(data), {
      onSuccess: () =>
        setNotificationConfig({
          opened: true,
          type: 'success',
          title: 'Roles updated succesfully',
        }),
      onError: (err: unknown) =>
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
  }, [data.all, data.assigned])

  /**
   * Effect to update the form's add/remove arrays based on rowSelection changes
   */
  useEffect(() => {
    if (!data.all.length) return

    const newSelectedIds = new Set(
      Object.keys(rowSelection)
        .filter(key => rowSelection[parseInt(key, 10)])
        .map(key => data.all[parseInt(key, 10)]),
    )

    const toAdd: string[] = []
    const toRemove: string[] = []

    data.all.forEach(element => {
      const isCurrentlySelected: boolean = newSelectedIds.has(element)
      const wasInitiallyAssigned: boolean = data.assigned.some(p => p.id === element.id)

      if (isCurrentlySelected && !wasInitiallyAssigned) {
        toAdd.push(element.id)
      } else if (!isCurrentlySelected && wasInitiallyAssigned) {
        toRemove.push(element.id)
      }
    })

    // Update the form values
    setValue('elementsToAdd', toAdd)
    setValue('elementsToRemove', toRemove)
    trigger()
  }, [rowSelection, data.all, data.assigned, setValue])

  return (
    <FlexBox direction="column" alignItems="flex-start" gap="2.5rem">
      <Link to="..">
        <FlexBox>
          <IconChevronLeft size={20} />
          <span>{display.backTo}</span>
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
            children: display.headerTitle,
            color: COLORS.brandHighlight,
          },
          subtitle: {
            size: 'bodyLarge',
            children: display.headerSubtitle,
          },
        }}
      />
      <Hero title={display.displayName} gap="0">
        <FlexBox direction="column" alignItems="flex-start" gap="1rem">
          {display.displayEmail && <div>{display.displayEmail}</div>}
          <FlexBox alignItems="flex-end">
            <FlexBox gap="0.5rem">
              {selectedPoliciesQty > 0 && (
                <Badge
                  text={`${selectedPoliciesQty} ${selectedPoliciesQty === 1 ? display.badgeSelectedOne : display.badgeSelectedMany}`}
                  color="blue"
                />
              )}
              {removedPoliciesQty > 0 && (
                <Badge
                  text={`${removedPoliciesQty} ${removedPoliciesQty === 1 ? display.badgeRemovedOne : display.badgeRemovedMany}`}
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
      </Hero>
      <ActionToolbar />
      <Table
        {...{
          columns,
          data: data.all,
          rowSelection,
          onRowSelectionChange: setRowSelection,
          ...tableOptions,
        }}
      />
    </FlexBox>
  )
}
