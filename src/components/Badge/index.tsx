import { BadgeContainer } from './styles'

type BadgeProps = {
  value: string
  color?: string
}

export default function Badge({ value, color }: BadgeProps) {
  return <BadgeContainer color={color}>{value}</BadgeContainer>
}
