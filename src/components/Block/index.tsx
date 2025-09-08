import type { FlexBoxProps } from '../FlexBox'
import { BlockWrapper } from './styles'

/**
 * This component is used to create a consistent layout and spacing (2.5rem) for most pages.
 *
 * Whenever you see a block of content, or a section, use this component.
 * @example
 * <Block>
 *   <h1>Heading</h1>
 *   <p>Some content</p>
 * </Block>
 *
 * @param {FlexBoxProps} [props] all FlexBox props
 */
const Block = ({ className, children, ...props }: FlexBoxProps) => {
  return (
    <BlockWrapper
      className={className}
      direction="column"
      justifyContent="stretch"
      alignItems="flex-start"
      gap="2.5rem"
      {...props}
    >
      {children}
    </BlockWrapper>
  )
}

export default Block
