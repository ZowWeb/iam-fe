import { Avatar, Image } from '@mantine/core'
import { Icon } from '@vds/icons'
import { useDisclosure } from '@mantine/hooks'

import FlexBox from '~/components/FlexBox'
import {
  AvatarWrapper,
  HeaderContainer,
  HeaderWrapper,
  Left,
  Right,
  ExternalLinksUl,
  ProfileLinksUl,
} from './styles'
import Typography from '~/components/Typography'
import { ExternalLink } from '~/components/Link'
import Drawer from '~/components/Drawer'
import TouchArea from '~/components/TouchArea'
import useMediaQuery from '~/hooks/useMediaQuery'

const LOGO_HEIGHT = '25px'

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

const profileLinksJSX = (
  <ProfileLinksUl>
    <li className="border-top">
      <Icon name="my-account" size={24} /> My profile
    </li>
    <li className="border-top">
      <Icon name="group-family" size={24} /> My teams
    </li>
    <li className="border-top">Talk to an expert</li>
    <li>Sign out</li>
  </ProfileLinksUl>
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

  const handleDrawerClose = () => {
    closeLinksDrawer()
    closeProfileDrawer()
  }

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Left>
          <Image src="/vz.svg" alt="VZ Logo" height={LOGO_HEIGHT} fit="contain" width="auto" />
          <Typography.Span size={LOGO_HEIGHT}>API Developer</Typography.Span>
        </Left>
        {isBelowTablet ? (
          <Right>
            <TouchArea onClick={openProfileDrawer}>
              <AvatarWrapper className="avatar" justifyContent="flex-end">
                <Avatar radius="xl">JD</Avatar>
              </AvatarWrapper>
            </TouchArea>
            <TouchArea onClick={openLinksDrawer} withPadding>
              <Icon name="menu" size={24} />
            </TouchArea>
          </Right>
        ) : (
          <Right>
            {externalLinksJSX}
            <AvatarWrapper className="avatar" justifyContent="flex-end">
              <Avatar radius="xl">JD</Avatar>
              <FlexBox direction="column" alignItems="flex-start">
                <span className="avatar__name">John Doe</span>
                <span className="avatar__team">Teamname</span>
              </FlexBox>
            </AvatarWrapper>
          </Right>
        )}
      </HeaderContainer>
      <Drawer opened={isLinksDrawerOpened} onClose={handleDrawerClose} title="Links">
        {externalLinksJSX}
      </Drawer>
      <Drawer opened={isProfileDrawerOpened} onClose={handleDrawerClose} title={profileDrawerHeader}>
        {profileLinksJSX}
      </Drawer>
    </HeaderWrapper>
  )
}

export default Header
