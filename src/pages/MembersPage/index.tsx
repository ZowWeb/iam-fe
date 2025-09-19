import { useCallback, useState } from 'react'
import type { MRT_Row as MRTRow } from 'mantine-react-table'
import { Notification } from '@vds/notifications'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useDisclosure } from '@mantine/hooks'

import Table from '~/components/AdvancedTable'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/ActionToolbar'
import type { Member } from '~/types/data'
import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import { sleep } from '~/utils'
import { handleErrorMessage } from '~/utils/errors'
import useMembers from '~/hooks/withSuspense/useMembers'
import InviteMembersModal from './components/InviteMembersModal'
import Block from '~/components/Block'
import { memberColumns } from '~/components/AdvancedTable/shared/columns'
import RemoveMemberModal from './components/RemoveMemberModal'

const ROW_ACTIONS = {
  RESEND_INVITE: 'Resend invite',
  CANCEL_INVITE: 'Cancel invite',
  REMOVE: 'Remove member',
} as const

type RowAction = keyof typeof ROW_ACTIONS

const MembersPage = () => {
  const { teamId } = useParams({ from: '/_authenticated/teams/$teamId/users' })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { members } = useMembers({ teamId })
  const [inviteMembersModalOpened, inviteMembersModalHandlers] = useDisclosure(false)
  const [removeMemberModalConfig, setRemoveMemberModalConfig] = useState<{
    opened: boolean
    data: Member | null
  }>({ opened: false, data: null })
  const [notificationConfig, setNotificationConfig] = useState<{
    opened: boolean
    type?: 'success' | 'error' | 'info' | 'warning'
    message: string
  }>({
    opened: false,
    message: '',
  })

  const rowActionMenuItems = useCallback((row: MRTRow<Member>) => {
    const handleRowAction = async (action: RowAction) => {
      try {
        if (action === 'REMOVE') {
          setRemoveMemberModalConfig({ opened: true, data: row.original })
          return
        }

        setIsLoading(true)
        await sleep()
        if (action === 'RESEND_INVITE') {
          setNotificationConfig({
            opened: true,
            type: 'success',
            message: `Invite resent to ${row.original.email}.`,
          })
        } else if (action === 'CANCEL_INVITE') {
          setNotificationConfig({
            opened: true,
            type: 'success',
            message: `Invite to ${row.original.email} was cancelled.`,
          })
        }
      } catch (err) {
        setNotificationConfig({
          opened: true,
          type: 'error',
          message: handleErrorMessage(err),
        })
      } finally {
        setIsLoading(false)
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
    inviteMembersModalHandlers.open()
  }

  const handleRowClick = (row: MRTRow<Member>) => {
    const { id } = row.original

    if (!id) return

    navigate({
      to: '/teams/$teamId/users/$userId',
      params: { teamId, userId: id },
    })
  }

  const handleInviteMembersSuccess = () => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      message: 'Invitation sent',
    })
  }

  const handleError = (err: unknown) => {
    setNotificationConfig({
      opened: true,
      type: 'error',
      message: handleErrorMessage(err),
    })
  }

  const handleRemoveMemberSuccess = (name: string) => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      message: `${name} was removed.`,
    })
  }

  return (
    <Block>
      {notificationConfig.opened && (
        <Notification
          type={notificationConfig.type}
          title={notificationConfig.message}
          onCloseButtonClick={() => setNotificationConfig({ opened: false, message: '' })}
        />
      )}
      <IamHero title="Members" subtitle="Invite members, remove them , and manage their access." />
      <ActionToolbar ctaConfig={{ label: 'Invite members', onClick: handleActionClick }} />
      <Table
        {...{
          data: members,
          columns: memberColumns,
          isLoading,
          enableRowActions: true,
          rowActionMenuItems,
          handleRowClick,
        }}
      />
      <InviteMembersModal
        teamId={teamId}
        opened={inviteMembersModalOpened}
        onClose={inviteMembersModalHandlers.close}
        onSuccess={handleInviteMembersSuccess}
        onError={handleError}
      />
      {removeMemberModalConfig.data && (
        <RemoveMemberModal
          teamId={teamId}
          member={removeMemberModalConfig.data}
          opened={removeMemberModalConfig.opened}
          onClose={() => setRemoveMemberModalConfig({ opened: false, data: null })}
          onSuccess={handleRemoveMemberSuccess}
          onError={handleError}
        />
      )}
    </Block>
  )
}

export default MembersPage
