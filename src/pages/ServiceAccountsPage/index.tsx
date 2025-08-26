import { useCallback, useState } from 'react'
import type { MRT_Row as MRTRow, MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { useNavigate } from '@tanstack/react-router'
import { useDisclosure } from '@mantine/hooks'
import { Notification } from '@vds/notifications'

import Table from '~/components/AdvancedTable'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/ActionToolbar'
import FlexBox from '~/components/FlexBox'
import type { ServiceAccount } from '~/types/data'
import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import { Route } from '~/routes/teams/$teamId/service-accounts'
import { getFormattedDate } from '~/utils/dates'
import useServiceAccounts from '~/hooks/useServiceAccounts'
import CreateServiceAccountModal from './components/CreateServiceAccountModal'
import { handleErrorMessage } from '~/utils/errors'
import DeleteServiceAccountModal from './components/DeleteServiceAccountModal'

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
  const { teamId } = Route.useParams()
  const { isLoading, serviceAccounts } = useServiceAccounts({ teamId })
  const [createModalOpened, createModalHandlers] = useDisclosure(false)
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false)
  const [serviceAccountToDelete, setServiceAccountToDelete] = useState<ServiceAccount>({} as ServiceAccount)
  const [notificationConfig, setNotificationConfig] = useState<{
    opened: boolean
    type?: 'success' | 'error' | 'info' | 'warning'
    message: string
  }>({
    opened: false,
    message: '',
  })
  const navigate = useNavigate()

  const rowActionMenuItems = useCallback((row: MRTRow<ServiceAccount>) => {
    const handleRowAction = async (action: RowAction) => {
      try {
        if (action === 'DELETE') {
          setServiceAccountToDelete(row.original)
          deleteModalHandlers.open()
        }
      } catch (err) {
        setNotificationConfig({
          opened: true,
          type: 'error',
          message: handleErrorMessage(err),
        })
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

  const handleActionClick = () => {
    createModalHandlers.open()
  }

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
      message: 'Service account created',
    })
  }

  const handleServiceAccountError = (err: unknown) => {
    setNotificationConfig({
      opened: true,
      type: 'error',
      message: handleErrorMessage(err),
    })
  }

  const handleDeleteServiceAccountSuccess = () => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      message: 'Service account deleted',
    })
  }

  return (
    <>
      <FlexBox direction="column" gap="2.5rem">
        {notificationConfig.opened && (
          <Notification
            type={notificationConfig.type}
            title={notificationConfig.message}
            onCloseButtonClick={() => setNotificationConfig({ opened: false, message: '' })}
          />
        )}
        <IamHero
          title="Service accounts"
          subtitle="Create services accounts, delete them,  and manage their access."
        />
        <ActionToolbar ctaConfig={{ label: 'Create service account', onClick: handleActionClick }} />
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
      <DeleteServiceAccountModal
        teamId={teamId}
        serviceAccount={serviceAccountToDelete}
        opened={deleteModalOpened}
        onClose={deleteModalHandlers.close}
        onSuccess={handleDeleteServiceAccountSuccess}
        onError={handleServiceAccountError}
      />
    </>
  )
}

export default ServiceAccountsPage
