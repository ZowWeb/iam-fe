import { styled } from '@linaria/react'

/**
 * Wrap clickable/tappable areas to provide seamless touch targets.
 * For small area targets use the `withPadding` prop to increase the touch area.
 */
const TouchArea = styled.div<{ withPadding?: boolean }>`
  display: grid;
  place-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: ${props => (props.withPadding ? '0.5rem' : '0')};
`

export default TouchArea
