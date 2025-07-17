import { Icon } from '@vds/icons'

import Typography from '~/components/Typography'
import { StyledFlexBox } from './styles'

type IamIconMessageProps = {
  text: string
}

const IamIconMessage = ({ text }: IamIconMessageProps) => {
  return (
    <StyledFlexBox>
      <Icon name="error" color="#B95319" size="small" />
      <Typography.Span size="0.75rem">{text}</Typography.Span>
    </StyledFlexBox>
  )
}

export default IamIconMessage
