import { styled } from '@linaria/react'
import { Link as RouterLink } from '@tanstack/react-router'

import { COLORS } from '~/styles/constants'

interface Props {
  to: string
  children: React.ReactNode
  bold?: boolean
  className?: string
}

const StyledLink = styled(RouterLink)<{ bold?: boolean }>`
  text-decoration: none;
  color: ${COLORS.black};

  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`

const Link = ({ children, ...props }: Props) => {
  return <StyledLink {...props}>{children}</StyledLink>
}

export default Link
