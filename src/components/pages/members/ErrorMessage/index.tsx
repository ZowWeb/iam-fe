import { Icon } from '@vds/icons'

import Typography from '~/components/Typography'
import { StyledFlexBox } from './styles'
import { COLORS } from '~/styles/constants'

type ErrorMessageProps = {
  text: string
}

const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return (
    <StyledFlexBox>
      <Icon name="error" color={COLORS.error} size="small" />
      <Typography.Span size="0.75rem">{text}</Typography.Span>
    </StyledFlexBox>
  )
}

export default ErrorMessage
