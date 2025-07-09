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

/**
 * FlexBox is a generic flexbox container that can be used to position elements
 * with a variety of flexbox styles.
 *
 * @param {React.ReactNode} children - The children to be rendered inside the
 *   flexbox container.
 * @param {string} className - An optional class name to be added to the
 *   container.
 * @param {React.CSSProperties} customStyle - An optional custom style to be
 *   applied to the container.
 * @param {FlexBoxProps} props - Optional props that can be used to customize the
 *   flexbox container.
 * @returns {React.JSX.Element} The rendered flexbox container.
 */
const FlexBox = ({ children, className, customStyle, ...props }: FlexBoxProps) => {
  return (
    <FlexBoxContainer className={className} style={customStyle} {...props}>
      {children}
    </FlexBoxContainer>
  )
}

export default FlexBox
