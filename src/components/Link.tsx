import React from 'react'
import { styled } from '@linaria/react'
import { createLink, type LinkComponent } from '@tanstack/react-router'

import { COLORS } from '~/styles/constants'

const StyledLink = styled.a`
  text-decoration: none;
  color: ${COLORS.black};

  &.active,
  &.bold,
  &:active,
  &:hover {
    font-weight: 700;
  }
`

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  className?: string
  external?: boolean
}

const CustomLinkComponent = React.forwardRef<HTMLAnchorElement, Props>(({ className, ...props }, ref) => {
  return <StyledLink ref={ref} {...props} className={className} />
})

const CreatedLinkComponent = createLink(CustomLinkComponent)

const Link: LinkComponent<typeof CustomLinkComponent> = props => {
  return <CreatedLinkComponent preload={false} activeOptions={{ exact: true }} {...props} />
}

export default Link
export const ExternalLink = StyledLink
