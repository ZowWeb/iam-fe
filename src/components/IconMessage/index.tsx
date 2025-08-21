import { Icon, type IconProps } from '@vds/icons'

import Typography from '~/components/Typography'
import { COLORS, FONT_WEIGHTS } from '~/styles/constants'
import FlexBox from '~/components/FlexBox'
import type { FontSize } from '~/types/theme'

type IconMessageProps = {
  type?: IconProps['name']
  text?: React.ReactNode
  fontSize?: FontSize
}

const IconMessage = ({ type = 'error', text, fontSize = '0.75rem' }: IconMessageProps) => {
  if (!text) return null

  const colour = type === 'error' ? COLORS.error : COLORS.primary

  return (
    <FlexBox>
      <Icon name={type} color={colour} size="small" />
      <Typography.Span weight={FONT_WEIGHTS.medium} size={fontSize}>
        {text}
      </Typography.Span>
    </FlexBox>
  )
}

export default IconMessage
