import { Menu } from '@mantine/core'

import {
  Wrapper,
  TitleWithActionWrapper,
  Title,
  Subtitle,
  StyledActionIcon,
  StyledIconDots,
  MenuWrapper,
} from './styles'
import DropDownMenu, { type DropDownMenuItem } from '../DropDownMenu'

export type ActionButtonConfig = {
  menuDropdownItems: DropDownMenuItem[]
  actionClickHandler: (key: string) => void
}

type Props = {
  title: string
  subtitle?: string
  actionButtonConfig?: ActionButtonConfig
  children?: React.ReactNode
  gap?: string
}

const Hero = ({ title, subtitle, actionButtonConfig, children, gap = '1.5rem' }: Props) => {
  const { menuDropdownItems, actionClickHandler = () => {} } = actionButtonConfig || {}

  return (
    <Wrapper direction="column" alignItems="flex-start" gap={gap}>
      <TitleWithActionWrapper>
        <Title>{title}</Title>
        {menuDropdownItems && (
          <MenuWrapper direction="column" alignItems="flex-start">
            <Menu>
              <Menu.Target>
                <StyledActionIcon variant="filled" aria-label="Settings" size="input-md">
                  <StyledIconDots stroke={1.3} fill="true" />
                </StyledActionIcon>
              </Menu.Target>
              <DropDownMenu items={menuDropdownItems} actionClickHandler={actionClickHandler} />
            </Menu>
          </MenuWrapper>
        )}
      </TitleWithActionWrapper>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Wrapper>
  )
}

export default Hero
