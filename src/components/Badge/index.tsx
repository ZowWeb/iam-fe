import { FONT_WEIGHTS } from '~/styles/constants'
import { BadgeContainer } from './styles'

type BadgeProps = {
  value: string
  color?: string
}

export default function Badge({ value, color = 'black' }: BadgeProps) {
  return (
    <BadgeContainer color={color} size="0.75rem" weight={FONT_WEIGHTS.medium}>
      {value}
    </BadgeContainer>
  )
}
