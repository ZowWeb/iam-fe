import { BadgeContainer, type BadgeColor, type BadgeRadius } from './styles'

type BadgeProps = {
  text: string
  color?: BadgeColor
  radius?: BadgeRadius
}

export default function Badge({ text, color = 'red', radius = 'normal' }: BadgeProps) {
  return (
    <BadgeContainer badgeColor={color} badgeRadius={radius}>
      {text}
    </BadgeContainer>
  )
}
