import { useCallback, useState } from 'react'
import type { MRT_Row as MRTRow } from 'mantine-react-table'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Notification } from '@vds/notifications'
import { useDisclosure } from '@mantine/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'

import Table from '~/components/AdvancedTable'
import Hero from '~/components/Hero'
import ActionToolbar from '~/components/ActionToolbar'
import type { PolicyTag } from '~/types/data'
import { handleErrorMessage } from '~/utils/errors'
import CreateRoleModal from './components/CreateRoleModal'
import DeleteRoleModal from './components/DeleteRoleModal'
import getPolicyTags from '~/queries/getPolicyTags'
import Block from '~/components/Block'
import { policyTagColumns } from '~/components/AdvancedTable/shared/columns'
import DropDownMenu, { type DropDownMenuItem } from '~/components/DropDownMenu'

const ROW_ACTIONS: DropDownMenuItem[] = [{ key: 'DELETE', label: 'Delete role' }]

const RolesPage = () => {
  const { teamId } = useParams({ from: '/_authenticated/teams/$teamId/roles' })
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
    const handleRowAction = async (action: string) => {
      if (action === 'DELETE') {
        setDeleteModalConfig({ opened: true, data: row.original })
      }
    }

    return <DropDownMenu actionClickHandler={handleRowAction} items={ROW_ACTIONS} />
  }, [])

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

  const handleRowClick = (row: MRTRow<PolicyTag>) => {
    navigate({
      to: '/teams/$teamId/roles/$policyTagId',
      params: { teamId, policyTagId: row.original.id },
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
      <Hero title="Roles" subtitle="Create roles to manage access for members and service accounts." />
      <ActionToolbar ctaConfig={{ label: 'Create a role', onClick: () => createModalHandlers.open() }} />
      <Table
        {...{
          data: policyTags,
          columns: policyTagColumns,
          isLoading,
          enableRowActions: true,
          rowActionMenuItems,
          handleRowClick,
        }}
      />
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
    </Block>
  )
}

export default RolesPage
