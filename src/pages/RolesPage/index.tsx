import { useCallback, useState } from 'react'
import type { MRT_Row as MRTRow, MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Notification } from '@vds/notifications'
import { useDisclosure } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'

import Table from '~/components/AdvancedTable'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/ActionToolbar'
import FlexBox from '~/components/FlexBox'
import type { PolicyTag } from '~/types/data'
import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import { handleErrorMessage } from '~/utils/errors'
import CreateRoleModal from './components/CreateRoleModal'
import DeleteRoleModal from './components/DeleteRoleModal'
import { getFormattedDate } from '~/utils/dates'
import getPolicyTags from '~/queries/getPolicyTags'

const columns: MRTColumnDef<PolicyTag>[] = [
  {
    accessorKey: 'policyTagName',
    header: 'Name',
    size: 100,
  },
  {
    accessorKey: 'description', // TODO: Review field not present.
    header: 'Description',
    size: 100,
  },
  {
    accessorKey: 'updatedAt', // TODO: Review field not present.
    header: 'Last updated',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
]

const ROW_ACTIONS = {
  DELETE: 'Delete role',
} as const

type RowAction = keyof typeof ROW_ACTIONS

const RolesPage = () => {
  const { teamId } = useParams({ from: '/teams/$teamId/roles' })
  const { data: policyTags = [], isLoading } = useSuspenseQuery(getPolicyTags({ teamId }))
  const [createModalOpened, createModalHandlers] = useDisclosure(false)
  const [deleteModalConfig, setDeleteModalConfig] = useState<{
    opened: boolean
    data: PolicyTag | null
  }>({ opened: false, data: null })
  const [notificationConfig, setNotificationConfig] = useState<{
    opened: boolean
    type?: 'success' | 'error' | 'info' | 'warning'
    title: string
    subtitle?: string
  }>({
    opened: false,
    title: '',
  })
  const navigate = useNavigate()

  const rowActionMenuItems = useCallback((row: MRTRow<PolicyTag>) => {
    const handleRowAction = async (action: RowAction) => {
      if (action === 'DELETE') {
        setDeleteModalConfig({ opened: true, data: row.original })
      }
    }

    return (
      <MenuDropdown>
        {Object.entries(ROW_ACTIONS).map(([action, label]) => (
          <MenuItem
            key={action}
            onClick={event => {
              event.stopPropagation()
              handleRowAction(action as RowAction)
            }}
          >
            {label}
          </MenuItem>
        ))}
      </MenuDropdown>
    )
  }, [])

  // TODO: Navigate to details page once is ready
  const handleRowClick = () => {
    navigate({
      to: '/teams/$teamId/roles',
      params: { teamId },
    })
  }

  const handleCreateRoleSuccess = () => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      title: 'Role created',
    })
  }

  const handleRoleError = (err: unknown) => {
    setNotificationConfig({
      opened: true,
      type: 'error',
      title: handleErrorMessage(err),
    })
  }

  const handleDeleteRoleSuccess = (policyTagName: string) => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      title: `${policyTagName} was deleted.`,
    })
  }

  return (
    <>
      <FlexBox direction="column" gap="2.5rem">
        {notificationConfig.opened && (
          <Notification
            type={notificationConfig.type}
            title={notificationConfig.title}
            subtitle={notificationConfig.subtitle}
            onCloseButtonClick={() => setNotificationConfig({ opened: false, title: '', subtitle: '' })}
          />
        )}
        <IamHero title="Roles" subtitle="Create roles to manage access for members and service accounts." />
        <ActionToolbar ctaConfig={{ label: 'Create a role', onClick: () => createModalHandlers.open() }} />
        <Table
          {...{
            data: policyTags,
            columns,
            isLoading,
            enableRowActions: true,
            rowActionMenuItems,
            handleRowClick,
          }}
        />
      </FlexBox>
      <CreateRoleModal
        teamId={teamId}
        opened={createModalOpened}
        onClose={createModalHandlers.close}
        onSuccess={handleCreateRoleSuccess}
        onError={handleRoleError}
      />
      {deleteModalConfig.data && (
        <DeleteRoleModal
          teamId={teamId}
          policyTag={deleteModalConfig.data}
          opened={deleteModalConfig.opened}
          onClose={() => setDeleteModalConfig({ opened: false, data: null })}
          onSuccess={handleDeleteRoleSuccess}
          onError={handleRoleError}
        />
      )}
    </>
  )
}

export default RolesPage
