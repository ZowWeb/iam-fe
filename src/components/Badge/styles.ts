import { styled } from '@linaria/react'

import { COLORS } from '~/styles/constants'
import Typography from '../Typography'

export const colorMap = {
  blue: COLORS.vdsBlue38,
  yellow: COLORS.vdsYellow53,
  red: COLORS.vdsRed,
} as const

export type BadgeColor = keyof typeof colorMap

export type BadgeContainerProps = {
  badgeColor: BadgeColor
}

const getBackgroundColor = (badgeColor: BadgeColor) => {
  return colorMap[badgeColor]
}

const getTextColor = (badgeColor: BadgeColor) => {
  return badgeColor === 'yellow' ? COLORS.black : COLORS.white
}

export const BadgeContainer = styled(Typography.Span)<BadgeContainerProps>`
  font-size: 0.75rem;
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  background-color: ${({ badgeColor }) => getBackgroundColor(badgeColor)};
  color: ${({ badgeColor }) => getTextColor(badgeColor)};
`
