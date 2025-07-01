import type { FlexBoxProps } from '../FlexBox'
import { BlockWrapper } from './styles'

const Block = ({ className, children, ...props }: FlexBoxProps) => {
  return (
    <BlockWrapper className={className} {...props}>
      {children}
    </BlockWrapper>
  )
}

export default Block
