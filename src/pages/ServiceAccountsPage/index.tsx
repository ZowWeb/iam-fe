import { useCallback, useState } from 'react'
import type { MRT_Row as MRTRow } from 'mantine-react-table'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useDisclosure } from '@mantine/hooks'
import { Notification } from '@vds/notifications'
import { useSuspenseQuery } from '@tanstack/react-query'

import Table from '~/components/AdvancedTable'
import Hero from '~/components/Hero'
import ActionToolbar from '~/components/ActionToolbar'
import type { ServiceAccount } from '~/types/data'
import CreateServiceAccountModal from './components/CreateServiceAccountModal'
import { handleErrorMessage } from '~/utils/errors'
import DeleteServiceAccountModal from './components/DeleteServiceAccountModal'
import getServiceAccounts from '~/queries/getServiceAccounts'
import Block from '~/components/Block'
import { serviceAccountColumns } from '~/components/AdvancedTable/shared/columns'
import type { RowAction } from '~/components/DropDownMenu'
import DropDownMenu from '~/components/DropDownMenu'

const ROW_ACTIONS: RowAction = {
  DELETE: 'Delete service account',
}

const ServiceAccountsPage = () => {
  const { teamId } = useParams({ from: '/_authenticated/teams/$teamId/service-accounts/' })
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
    const handleRowAction = (action: string) => {
      if (action === 'DELETE') {
        setDeleteModalConfig({ opened: true, data: row.original })
      }
    }

    return <DropDownMenu actionClickHandler={handleRowAction} items={ROW_ACTIONS} />
  }, [])

  const handleRowClick = (row: MRTRow<ServiceAccount>) => {
    navigate({
      to: '/teams/$teamId/service-accounts/$serviceAccountId',
      params: { teamId, serviceAccountId: row.original.id },
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
    <Block>
      {notificationConfig.opened && (
        <Notification
          type={notificationConfig.type}
          title={notificationConfig.title}
          subtitle={notificationConfig.subtitle}
          onCloseButtonClick={() => setNotificationConfig({ opened: false, title: '', subtitle: '' })}
        />
      )}
      <Hero
        title="Service accounts"
        subtitle="Create services accounts, delete them,  and manage their access."
      />
      <ActionToolbar
        ctaConfig={{ label: 'Create service account', onClick: () => createModalHandlers.open() }}
      />
      <Table
        {...{
          data: serviceAccounts,
          columns: serviceAccountColumns,
          isLoading,
          enableRowActions: true,
          rowActionMenuItems,
          handleRowClick,
        }}
      />
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
    </Block>
  )
}

export default ServiceAccountsPage
