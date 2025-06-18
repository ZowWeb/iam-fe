import React from 'react'
import { styled } from '@linaria/react'

type FlexBoxProps = Partial<{
  children: React.ReactNode
  className: string
  customStyle: React.CSSProperties
  direction: React.CSSProperties['flexDirection']
  justifyContent: React.CSSProperties['justifyContent']
  alignItems: React.CSSProperties['alignItems']
  wrap: boolean
  gap: string | number
  flex: string | number
  onClick: React.MouseEventHandler<HTMLDivElement>
}>

export const FlexBoxContainer = styled.div<FlexBoxProps>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'normal'};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  gap: ${props => props.gap || '0.25rem'};
  flex: ${props => props.flex || 'initial'};
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
`

const FlexBox = ({ children, className, onClick = () => {}, customStyle, ...props }: FlexBoxProps) => {
  return (
    <FlexBoxContainer className={className} style={customStyle} onClick={onClick} {...props}>
      {children}
    </FlexBoxContainer>
  )
}

export default FlexBox
