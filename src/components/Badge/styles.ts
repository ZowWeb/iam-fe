import { styled } from '@linaria/react'

import { COLORS } from '~/styles/constants'
import Typography from '../Typography'

export const colorMap: { [key: string]: string } = {
  blue: COLORS.vdsBlue38,
  yellow: COLORS.vdsYellow,
}

export type BadgeContainerProps = {
  size?: string | number
  weight?: number
  color: string
}

const getBackgroundColor = (colorName: string) => {
  return colorMap[colorName]
}

const getTextColor = (colorName: string) => {
  return colorName === 'yellow' ? 'black' : 'white'
}

export const BadgeContainer = styled(Typography.Span)<BadgeContainerProps>`
  background-color: ${props => getBackgroundColor(props.color)};
  color: ${props => getTextColor(props.color)};
  border-radius: 0.75rem;
  padding: 0.25rem 0.5rem;
`
