import { Button } from '@mantine/core'
import { useCallback, useState } from 'react'
import type { MRT_Row as MRTRow, MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { Notification } from '@vds/notifications'
import { useNavigate } from '@tanstack/react-router'
import { useDisclosure } from '@mantine/hooks'

import Table from '~/components/AdvancedTable'
import { data as initialData, moreData } from '../mocks/makeData'
import Block from '~/components/Block'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/ActionToolbar'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import Grid, { Col } from '~/components/Grid'
import FlexBox from '~/components/FlexBox'
import type { Member, Person } from '~/types/data'
import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import { sleep } from '~/utils'
import { handleErrorMessage } from '~/utils/errors'
import { Route } from '~/routes/teams/$teamId/users/route'
import useMembers from '~/hooks/useMembers'
import InviteMembersModal from '~/components/members/InviteMembersModal'

const tabsConfig: VdsTabConfig[] = [
  { id: 'teamDetails', label: 'Team Details' },
  { id: 'members', label: 'Members', selected: true },
  { id: 'policies', label: 'Policies' },
  { id: 'serviceAccounts', label: 'Service accounts' },
]

const columns: MRTColumnDef<Member>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'displayName',
    header: 'Display Name',
    size: 100,
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
    size: 100,
  },
  {
    accessorKey: 'idpSource',
    header: 'IDP Source',
    size: 50,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    Cell: ({ cell }) =>
      new Date(cell.getValue<string>()).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    size: 100,
  },
]

const ROW_ACTIONS = {
  RESEND_INVITE: 'Resend invite',
  CANCEL_INVITE: 'Cancel invite',
} as const

type RowAction = keyof typeof ROW_ACTIONS

const MembersPage = () => {
  const { teamId } = Route.useParams()
  const [data, setData] = useState<Person[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [notificationConfig, setNotificationConfig] = useState<{
    opened: boolean
    type?: 'success' | 'error' | 'info' | 'warning'
    message: string
  }>({
    opened: false,
    message: '',
  })
  const navigate = useNavigate()
  const { members } = useMembers()
  const [inviteMembersModalOpened, inviteMembersModalHandlers] = useDisclosure(false)

  const fetchLatestData = async () => {
    setIsLoading(true)
    await sleep()
    setData([...data, ...moreData])
    setIsLoading(false)
  }

  const rowActionMenuItems = useCallback((row: MRTRow<Member>) => {
    const handleRowAction = async (action: RowAction) => {
      try {
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
    navigate({
      to: '/teams/$teamId/users/$userId',
      params: { teamId, userId: row.original.id },
    })
  }

  return (
    <Block>
      <Grid>
        <Col span={3}>
          <VdsTabs onSelection={() => {}} config={tabsConfig} />
        </Col>
        <Col span={9}>
          <FlexBox direction="column" gap="2.5rem">
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
                columns,
                isLoading,
                enableRowActions: true,
                rowActionMenuItems,
                handleRowClick,
              }}
            />
            <Button onClick={fetchLatestData} loading={isLoading}>
              Fetch latest data
            </Button>
          </FlexBox>
        </Col>
      </Grid>
      <InviteMembersModal opened={inviteMembersModalOpened} onClose={inviteMembersModalHandlers.close} />
    </Block>
  )
}

export default MembersPage
