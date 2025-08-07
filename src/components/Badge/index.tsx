import { BadgeContainer, type BadgeColor } from './styles'

type BadgeProps = {
  text: string
  color?: BadgeColor
}

export default function Badge({ text, color = 'red' }: BadgeProps) {
  return <BadgeContainer badgeColor={color}>{text}</BadgeContainer>
}
