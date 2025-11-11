import { Avatar, Image, Menu, UnstyledButton } from '@mantine/core'
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
  StyledItem,
} from './styles'
import Typography from '~/components/Typography'
import { ExternalLink } from '~/components/Link'
import Drawer from '~/components/Drawer'
import TouchArea from '~/components/TouchArea'
import useMediaQuery from '~/hooks/useMediaQuery'
import type { DropDownMenuItem } from '~/components/DropDownMenu'
import { TEAM_ID } from '~/constants/params'
import DropDownMenu from '~/components/DropDownMenu'

enum MENU_ITEM_KEYS {
  MY_PROFILE = 'MY_PROFILE',
}

const LOGO_HEIGHT = '25px'
const MENU_ITEMS: DropDownMenuItem[] = [
  { key: MENU_ITEM_KEYS.MY_PROFILE, label: 'My Profile', leftIcon: <IconUserCircle /> },
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
  <AvatarWrapper direction="column" alignItems="flex-start">
    <Avatar radius="xl">JD</Avatar>
    <FlexBox direction="column" alignItems="flex-start">
      <span className="userName">John Doe</span>
      <span className="teamName">Teamname</span>
    </FlexBox>
  </AvatarWrapper>
)

const Header = () => {
  const [isLinksDrawerOpened, { open: openLinksDrawer, close: closeLinksDrawer }] = useDisclosure(false)
  const [isProfileDrawerOpened, { open: openProfileDrawer, close: closeProfileDrawer }] = useDisclosure(false)
  const { isBelowTablet } = useMediaQuery()
  const navigate = useNavigate()

  const handleDrawerClose = () => {
    closeLinksDrawer()
    closeProfileDrawer()
  }

  const closeDrawerAndNavigateToProfilePage = () => {
    handleDrawerClose()
    navigate({ to: '/teams/$teamId/profile', params: { teamId: TEAM_ID } })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      closeDrawerAndNavigateToProfilePage()
    }
  }

  const actionClickHandler = (key: string) => {
    if (key === MENU_ITEM_KEYS.MY_PROFILE) {
      closeDrawerAndNavigateToProfilePage()
    }
  }

  const profileLinksJSX = (
    <ProfileLinksUl>
      <li className="border-top">
        <StyledItem
          tabIndex={0}
          role="button"
          onClick={() => actionClickHandler(MENU_ITEM_KEYS.MY_PROFILE)}
          onKeyDown={handleKeyDown}
        >
          <Icon name="my-account" size={24} /> My profile
        </StyledItem>
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
              <AvatarWrapper justifyContent="flex-end">
                <Avatar radius="xl">JD</Avatar>
              </AvatarWrapper>
            </TouchArea>
            <TouchArea onClick={openLinksDrawer} withPadding>
              <Icon name="menu" size={24} />
            </TouchArea>
          </Right>
        ) : (
          <Right alignItems="center" flex="0 0 auto" gap="1.5rem">
            {externalLinksJSX}
            <Menu trigger="click-hover">
              <Menu.Target>
                <UnstyledButton>
                  <AvatarWrapper justifyContent="flex-end">
                    <Avatar radius="xl">JD</Avatar>
                    <FlexBox direction="column" alignItems="flex-start">
                      <span className="userName">John Doe</span>
                      <span className="teamName">Teamname</span>
                    </FlexBox>
                  </AvatarWrapper>
                </UnstyledButton>
              </Menu.Target>
              <DropDownMenu items={MENU_ITEMS} actionClickHandler={actionClickHandler} />
            </Menu>
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
