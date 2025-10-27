import { Menu } from '@mantine/core'
import { styled } from '@linaria/react'

import { theme } from '~/styles/theme'
import { BUTTON_ICON_DROP_SHADOW, COLORS } from '~/styles/constants'

export const MenuDropdown = styled(Menu.Dropdown)`
  padding: 0;
  min-width: 10rem;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: ${BUTTON_ICON_DROP_SHADOW};
`

export const MenuItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0;

  &:nth-of-type(n + 2) {
    border-top: 0.25px solid ${COLORS.dropdownBorder};
  }
`
