/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Avatar, Image, Menu } from '@mantine/core'
import { Icon } from '@vds/icons'
import { useDisclosure } from '@mantine/hooks'
import { IconUserCircle } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'

import FlexBox from '~/components/FlexBox'
import {
  AvatarWrapper,
  BorderedHeader,
  ContentContainer,
  Left,
  Right,
  ExternalLinksUl,
  ProfileLinksUl,
  StyledActionIcon,
} from './styles'
import Typography from '~/components/Typography'
import { ExternalLink } from '~/components/Link'
import Drawer from '~/components/Drawer'
import TouchArea from '~/components/TouchArea'
import useMediaQuery from '~/hooks/useMediaQuery'
import type { DropDownMenuItem } from '~/components/DropDownMenu'
import { useUser } from '~/hooks/useUser'
import { TEAM_ID } from '~/constants/params'
import DropDownMenu from '~/components/DropDownMenu'

const LOGO_HEIGHT = '25px'
const MENU_ITEMS: DropDownMenuItem[] = [
  { key: 'MY_PROFILE', label: 'My Profile', leftIcon: <IconUserCircle /> },
]

const externalLinksJSX = (
  <ExternalLinksUl>
    <li>
      <ExternalLink href="#" className="bold">
        Dashboard
      </ExternalLink>
    </li>
    <li>
      <ExternalLink href="#" className="bold">
        Documentation
      </ExternalLink>
    </li>
    <li>
      <ExternalLink href="#" className="bold">
        Identity & Access Management
      </ExternalLink>
    </li>
    <li>
      <ExternalLink href="#" className="bold">
        Support
      </ExternalLink>
    </li>
  </ExternalLinksUl>
)

const profileDrawerHeader = (
  <AvatarWrapper className="avatar" direction="column" alignItems="flex-start">
    <Avatar radius="xl">JD</Avatar>
    <FlexBox direction="column" alignItems="flex-start">
      <span className="avatar__name">John Doe</span>
      <span className="avatar__team">Teamname</span>
    </FlexBox>
  </AvatarWrapper>
)

const Header = () => {
  const [isLinksDrawerOpened, { open: openLinksDrawer, close: closeLinksDrawer }] = useDisclosure(false)
  const [isProfileDrawerOpened, { open: openProfileDrawer, close: closeProfileDrawer }] = useDisclosure(false)
  const { isBelowTablet } = useMediaQuery()
  const { user } = useUser()
  const navigate = useNavigate()

  const handleDrawerClose = () => {
    closeLinksDrawer()
    closeProfileDrawer()
  }

  const actionClickHandler = (key: string) => {
    if (key === 'MY_PROFILE') {
      handleDrawerClose()
      navigate({ to: '/teams/$teamId/profile', params: { teamId: TEAM_ID } })
    }
  }

  const profileLinksJSX = (
    <ProfileLinksUl>
      <li className="border-top" onClick={() => actionClickHandler('MY_PROFILE')}>
        <Icon name="my-account" size={24} /> My profile
      </li>
      <li className="border-top">
        <Icon name="group-family" size={24} /> My teams
      </li>
      <li className="border-top">Talk to an expert</li>
      <li>Sign out</li>
    </ProfileLinksUl>
  )

  return (
    <BorderedHeader>
      <ContentContainer>
        <Left alignItems="center" flex="1 0 auto">
          <Image src="/vz.svg" alt="VZ Logo" height={LOGO_HEIGHT} fit="contain" width="auto" />
          <Typography.Span size={LOGO_HEIGHT}>API Developer</Typography.Span>
        </Left>
        {isBelowTablet ? (
          <Right alignItems="center" flex="0 0 auto" gap="0.5rem">
            <TouchArea onClick={openProfileDrawer}>
              <AvatarWrapper className="avatar" justifyContent="flex-end">
                <FlexBox direction="column" alignItems="flex-start">
                  <span className="avatar__name">{user?.displayName}</span>
                  <span className="avatar__team">Teamname</span>
                </FlexBox>
              </AvatarWrapper>
            </TouchArea>
            <TouchArea onClick={openLinksDrawer} withPadding>
              <Icon name="menu" size={24} />
            </TouchArea>
          </Right>
        ) : (
          <Right alignItems="center" flex="0 0 auto" gap="1.5rem">
            {externalLinksJSX}
            <AvatarWrapper className="avatar" justifyContent="flex-end">
              <Menu>
                <Menu.Target>
                  <StyledActionIcon variant="transparent" size="xl">
                    <Avatar radius="xl">JD</Avatar>
                  </StyledActionIcon>
                </Menu.Target>
                <DropDownMenu items={MENU_ITEMS} actionClickHandler={actionClickHandler} />
              </Menu>
              <FlexBox direction="column" alignItems="flex-start">
                <span className="avatar__name">John Doe</span>
                <span className="avatar__team">Teamname</span>
              </FlexBox>
            </AvatarWrapper>
          </Right>
        )}
      </ContentContainer>
      <Drawer opened={isLinksDrawerOpened} onClose={handleDrawerClose} title="Links">
        {externalLinksJSX}
      </Drawer>
      <Drawer opened={isProfileDrawerOpened} onClose={handleDrawerClose} title={profileDrawerHeader}>
        {profileLinksJSX}
      </Drawer>
    </BorderedHeader>
  )
}

export default Header
