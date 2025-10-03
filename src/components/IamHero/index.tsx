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
import { MenuDropdown, MenuItem } from '../AdvancedTable/styles'

export type RowAction = {
  [key: string]: string
}

type ActionButtonConfig = {
  show: boolean
  menuDropdownItems: RowAction
  actionButtonHandler: (key: string) => void
}

type Props = {
  title: string
  subtitle?: string
  actionButtonConfig?: ActionButtonConfig
  children?: React.ReactNode
  gap?: string
}

const IamHero = ({ title, subtitle, actionButtonConfig, children, gap = '1.5rem' }: Props) => {
  const { show = false, menuDropdownItems = [], actionButtonHandler = () => {} } = actionButtonConfig || {}
  return (
    <Wrapper direction="column" alignItems="flex-start" gap={gap}>
      <TitleWithActionWrapper>
        <Title>{title}</Title>
        {show && (
          <MenuWrapper direction="column" alignItems="flex-start">
            <Menu>
              <Menu.Target>
                <StyledActionIcon variant="filled" aria-label="Settings" size="input-md">
                  <StyledIconDots stroke={1.3} fill="true" />
                </StyledActionIcon>
              </Menu.Target>

              <MenuDropdown>
                {Object.entries(menuDropdownItems).map(([action, label]) => (
                  <MenuItem
                    key={action}
                    onClick={event => {
                      event.stopPropagation()
                      actionButtonHandler(action)
                    }}
                  >
                    {label}
                  </MenuItem>
                ))}
              </MenuDropdown>
            </Menu>
          </MenuWrapper>
        )}
      </TitleWithActionWrapper>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Wrapper>
  )
}

export default IamHero
