import { styled } from '@linaria/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { Notification } from '@vds/notifications'

import Block from '~/components/Block'
import FlexBox from '~/components/FlexBox'
import IamHero from '~/components/IamHero'
import Typography from '~/components/Typography'
import getTeam from '~/queries/getTeam'
import { COLORS } from '~/styles/constants'
import type { Team } from '~/types/data'
import { getFormattedDate } from '~/utils/dates'
import { handleErrorMessage } from '~/utils/errors'
import UpdateTeamDetailsModal from './components/UpdateTeamDetailsModal'
import type { RowAction } from '~/components/DropDownMenu'

const FooterContainer = styled(FlexBox)`
  gap: 3.25rem;
  flex: 0 1 auto;
`

const FooterItemWrapper = styled(FlexBox)`
  flex: 0 1 max-content;
  gap: 0.5rem;
  word-break: break-all;
`

const Label = styled(Typography.Span)`
  font-size: 0.875rem;
  font-weight: 700;
`

const Value = styled(Typography.Span)`
  font-size: 0.875rem;
`

const Subtitle = styled(Typography.Span)`
  color: ${COLORS.secondary};
`

const createFooterItemsJSX = (team: Team) => {
  const footerItems = [
    {
      label: 'Team ID',
      value: team?.id,
    },
    {
      label: 'Type',
      value: team?.kind,
    },
    {
      label: 'Created',
      value: getFormattedDate(team?.createdAt || ''),
    },
  ]

  return (
    <FooterContainer alignItems="flex-start">
      {footerItems.map(item => (
        <FooterItemWrapper key={item.label} direction="column" alignItems="flex-start">
          <Label>{item.label}</Label>
          <Value>{item.value}</Value>
        </FooterItemWrapper>
      ))}
    </FooterContainer>
  )
}

const ROW_ACTIONS: RowAction = {
  UPDATE_TEAM: 'Update team details',
}

export default function TeamOverviewPage() {
  const { teamId } = useParams({ from: '/_authenticated/teams/$teamId' })
  const { data: team } = useSuspenseQuery(getTeam({ teamId }))
  const [updateModalConfig, setUpdateModalConfig] = useState<{
    opened: boolean
    data: Team | null
  }>({ opened: false, data: null })
  const [notificationConfig, setNotificationConfig] = useState<{
    opened: boolean
    type?: 'success' | 'error' | 'info' | 'warning'
    message: string
    subtitle?: string
  }>({
    opened: false,
    message: '',
    subtitle: '',
  })

  const handleActionClick = (key: string) => {
    switch (key) {
      case 'UPDATE_TEAM':
        setUpdateModalConfig({ data: team, opened: true })
        break

      default:
        break
    }
  }

  const handleUpdateTeamDetailsSuccess = () => {
    setNotificationConfig({
      opened: true,
      type: 'success',
      message: 'Team details have been changed.',
      subtitle: 'You will receive an email with the specific details.',
    })
  }

  const handleUpdateTeamDetailsError = (err: unknown) => {
    setNotificationConfig({
      opened: true,
      type: 'error',
      message: handleErrorMessage(err),
    })
  }

  const handleCloseUpdateTeamDetailsModal = () => {
    setUpdateModalConfig({ opened: false, data: null })
  }

  return (
    <Block>
      {notificationConfig.opened && (
        <Notification
          type={notificationConfig.type}
          title={notificationConfig.message}
          subtitle={notificationConfig.subtitle}
          onCloseButtonClick={() => setNotificationConfig({ opened: false, message: '', subtitle: '' })}
        />
      )}
      <FlexBox justifyContent="space-between">
        <FlexBox direction="column" alignItems="flex-start" gap="0.75rem">
          <Typography.H2>Identity & Access Management</Typography.H2>
          <Subtitle size="1.5rem">
            Securely control API access and define team permissions for collaborative development.
          </Subtitle>
        </FlexBox>
        <img height="250px" src="/hero_goraphics.png" alt="Hero" />
      </FlexBox>
      <IamHero
        title={team?.displayName || 'Team Name'}
        subtitle="We automatically created this team for you when you created  your account. Use this team to collaborate with colleagues and manage API client test credentials"
        actionButtonConfig={{
          show: true,
          menuDropdownItems: ROW_ACTIONS,
          actionClickHandler: handleActionClick,
        }}
      >
        {createFooterItemsJSX(team)}
      </IamHero>
      {updateModalConfig.data && (
        <UpdateTeamDetailsModal
          teamId={teamId}
          team={updateModalConfig.data}
          opened={updateModalConfig.opened}
          onClose={handleCloseUpdateTeamDetailsModal}
          onSuccess={handleUpdateTeamDetailsSuccess}
          onError={handleUpdateTeamDetailsError}
        />
      )}
    </Block>
  )
}
