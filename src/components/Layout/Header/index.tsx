import { Avatar, Image } from '@mantine/core'

import FlexBox from '~/components/FlexBox'
import { AvatarWrapper, HeaderContainer, HeaderWrapper, Left, Right } from './styles'
import Typography from '~/components/Typography'
import Link from '~/components/Link'

const LOGO_HEIGHT = '25px'

const Header = () => {
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
              <Link to="#" bold>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="#" bold>
                Documentation
              </Link>
            </li>
            <li>
              <Link to="#" bold>
                Identity & Access Management
              </Link>
            </li>
            <li>
              <Link to="#" bold>
                Support
              </Link>
            </li>
          </ul>
          <AvatarWrapper className="avatar" justifyContent="flex-end">
            <Avatar radius="xl">JD</Avatar>
            <FlexBox direction="column" alignItems="flex-start">
              <span className="avatar__name">John Doe</span>
              <span className="avatar__team">Teamname</span>
            </FlexBox>
          </AvatarWrapper>
        </Right>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header
