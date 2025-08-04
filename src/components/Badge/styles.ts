import { styled } from '@linaria/react'

import { COLORS } from '~/styles/constants'

export const colorMap: { [key: string]: string } = {
  blue: COLORS.vdsBlue,
  yellow: COLORS.vdsYellow,
}

const getBackgroundColor = (colorName: string | undefined) => {
  return colorName ? colorMap[colorName] || 'black' : 'black'
}

const getTextColor = (colorName: string | undefined) => {
  return colorName === 'yellow' ? 'black' : 'white'
}

export const BadgeContainer = styled.div`
  background-color: ${props => getBackgroundColor(props.color)};
  color: ${props => getTextColor(props.color)};
  border-radius: 25px;
  padding: 0 0.5rem;
`
