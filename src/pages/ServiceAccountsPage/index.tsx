import { useCallback, useState } from 'react'
import type { MRT_Row as MRTRow, MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useDisclosure } from '@mantine/hooks'
import { Notification } from '@vds/notifications'
import { useSuspenseQuery } from '@tanstack/react-query'

import Table from '~/components/AdvancedTable'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/ActionToolbar'
import FlexBox from '~/components/FlexBox'
import type { ServiceAccount } from '~/types/data'
import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import { getFormattedDate } from '~/utils/dates'
import CreateServiceAccountModal from './components/CreateServiceAccountModal'
import { handleErrorMessage } from '~/utils/errors'
import DeleteServiceAccountModal from './components/DeleteServiceAccountModal'
import getServiceAccounts from '~/queries/getServiceAccounts'

const columns: MRTColumnDef<ServiceAccount>[] = [
  {
    accessorKey: 'displayName',
    header: 'Name',
    size: 100,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created on',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last updated',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 50,
  },
]

const ROW_ACTIONS = {
  DELETE: 'Delete service account',
} as const

type RowAction = keyof typeof ROW_ACTIONS

const ServiceAccountsPage = () => {
  const { teamId } = useParams({ from: '/teams/$teamId/service-accounts' })
  const { data: serviceAccounts = [], isLoading } = useSuspenseQuery(getServiceAccounts({ teamId }))
  const [createModalOpened, createModalHandlers] = useDisclosure(false)
  const [deleteModalConfig, setDeleteModalConfig] = useState<{
    opened: boolean
    data: ServiceAccount | null
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

  const rowActionMenuItems = useCallback((row: MRTRow<ServiceAccount>) => {
    const handleRowAction = (action: RowAction) => {
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
      to: '/teams/$teamId/service-accounts',
      params: { teamId },
    })
  }

  const handleCreateServiceAccountSuccess = () => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      title: 'Service account created',
    })
  }

  const handleServiceAccountError = (err: unknown) => {
    setNotificationConfig({
      opened: true,
      type: 'error',
      title: handleErrorMessage(err),
    })
  }

  const handleDeleteServiceAccountSuccess = (displayName: string) => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      title: `${displayName} was deleted.`,
      subtitle: 'Associated credentials to this service account no longer have access.',
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
        <IamHero
          title="Service accounts"
          subtitle="Create services accounts, delete them,  and manage their access."
        />
        <ActionToolbar
          ctaConfig={{ label: 'Create service account', onClick: () => createModalHandlers.open() }}
        />
        <Table
          {...{
            data: serviceAccounts,
            columns,
            isLoading,
            enableRowActions: true,
            rowActionMenuItems,
            handleRowClick,
          }}
        />
      </FlexBox>
      <CreateServiceAccountModal
        teamId={teamId}
        opened={createModalOpened}
        onClose={createModalHandlers.close}
        onSuccess={handleCreateServiceAccountSuccess}
        onError={handleServiceAccountError}
      />
      {deleteModalConfig.data && (
        <DeleteServiceAccountModal
          teamId={teamId}
          serviceAccount={deleteModalConfig.data}
          opened={deleteModalConfig.opened}
          onClose={() => setDeleteModalConfig({ opened: false, data: null })}
          onSuccess={handleDeleteServiceAccountSuccess}
          onError={handleServiceAccountError}
        />
      )}
    </>
  )
}

export default ServiceAccountsPage
