import React from 'react'
import { styled } from '@linaria/react'

export type FlexBoxProps = Partial<{
  children: React.ReactNode
  className: string
  customStyle: React.CSSProperties
  direction: React.CSSProperties['flexDirection']
  justifyContent: React.CSSProperties['justifyContent']
  alignItems: React.CSSProperties['alignItems']
  wrap: boolean
  gap: string | number
  flex: string | number
}>

const FlexBoxContainer = styled.div<FlexBoxProps>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'center'};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  gap: ${props => props.gap || '0.25rem'};
  flex: ${props => props.flex || 'initial'};
`

const FlexBox = ({ children, className, customStyle, ...props }: FlexBoxProps) => {
  return (
    <FlexBoxContainer className={className} style={customStyle} {...props}>
      {children}
    </FlexBoxContainer>
  )
}

export default FlexBox
