import { Avatar, Image } from '@mantine/core'

import FlexBox from '~/components/FlexBox'
import { AvatarWrapper, HeaderContainer, HeaderWrapper, Left, Right } from './styles'
import Typography from '~/components/Typography'
import { ExternalLink } from '~/components/Link'
import { useUser } from '~/hooks/useUser'

const LOGO_HEIGHT = '25px'

const Header = () => {
  const { user } = useUser()

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Left>
          <Image src="/vz.svg" alt="VZ Logo" height={LOGO_HEIGHT} fit="contain" width="auto" />
          <Typography.Span size={LOGO_HEIGHT}>API Developer</Typography.Span>
        </Left>
        <Right>
          <ul>
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
          </ul>
          <AvatarWrapper className="avatar" justifyContent="flex-end">
            <Avatar radius="xl">JD</Avatar>
            <FlexBox direction="column" alignItems="flex-start">
              <span className="avatar__name">{user?.displayName}</span>
              <span className="avatar__team">Teamname</span>
            </FlexBox>
          </AvatarWrapper>
        </Right>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header
