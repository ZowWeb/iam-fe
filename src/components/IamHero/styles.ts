import { styled } from '@linaria/react'
import { ActionIcon, Menu } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'

import FlexBox from '../FlexBox'
import Typography from '../Typography'
import { BUTTON_ICON_DROP_SHADOW, COLORS } from '~/styles/constants'

export const Wrapper = styled(FlexBox)`
  background: #f6f6f6;
  border-radius: 0.75rem;
  padding: 2rem 1.5rem;
`

export const TitleWithActionWrapper = styled(FlexBox)`
  justify-content: space-between;
`

export const Title = styled(Typography.H3)``

export const Subtitle = styled(Typography.Paragraph)`
  color: ${COLORS.secondary};
`

export const StyledActionIcon = styled(ActionIcon)`
  border-radius: 50%;
  background-color: #efefef;

  &:hover {
    background-color: #efefef;
  }
`

export const StyledIconDots = styled(IconDots)`
  color: black;
`

export const MenuWrapper = styled(FlexBox)`
  width: fit-content;
  align-self: flex-start;
`

export const MenuDropdown = styled(Menu.Dropdown)`
  padding: 0;
  min-width: 10rem;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: ${BUTTON_ICON_DROP_SHADOW};
`

export const MenuItem = styled(Menu.Item)`
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0;

  &:nth-of-type(n + 2) {
    border-top: 0.25px solid ${COLORS.dropdownBorder};
  }
`
