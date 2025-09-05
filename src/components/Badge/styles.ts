import { styled } from '@linaria/react'

import { COLORS } from '~/styles/constants'
import Typography from '../Typography'

export const colorMap = {
  blue: COLORS.vdsBlue38,
  yellow: COLORS.vdsYellow53,
  red: COLORS.vdsRed,
} as const

export const radiusMap = {
  small: '0.125rem',
  normal: '0.75rem',
}

export type BadgeColor = keyof typeof colorMap
export type BadgeRadius = keyof typeof radiusMap

export type BadgeContainerProps = {
  badgeColor: BadgeColor
  badgeRadius: BadgeRadius
}

const getRadius = (badgeRadius: BadgeRadius) => {
  return radiusMap[badgeRadius]
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
  border-radius: ${({ badgeRadius }) => getRadius(badgeRadius)};
  background-color: ${({ badgeColor }) => getBackgroundColor(badgeColor)};
  color: ${({ badgeColor }) => getTextColor(badgeColor)};
`
