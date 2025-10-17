import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'
import { Card, Divider, FooterItem } from './styles'
import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { FONT_WEIGHTS } from '~/styles/constants'

const footerItems = [
  {
    label: 'Created on',
    value: 'July 21, 2025 12:24 PM',
  },
  {
    label: 'Created by',
    value: 'Firstname Lastname',
  },
  {
    label: 'Expires',
    value: 'None',
  },
]

const footerItemsJSX = (
  <FlexBox alignItems="center" gap='1.5rem' wrap={true}>
    {footerItems.map(item => (
      <FooterItem key={item.label} gap="0.25rem" direction='column' alignItems='flex-start'>
        <Typography.Span weight={FONT_WEIGHTS.bold} size="0.875rem">
          {item.label}
        </Typography.Span>
        <Typography.Span weight={FONT_WEIGHTS.medium} size="0.875rem">
          {item.value}
        </Typography.Span>
      </FooterItem>
    ))}
  </FlexBox>
)

export default function MemberCard() {
  return (
    <Card direction="column" alignItems="flex-start" gap="0">
      <FlexBox alignItems="center">
        <Typography.Span weight={FONT_WEIGHTS.bold}>Member</Typography.Span>
        <FlexBox justifyContent="flex-end">
          <ButtonIcon
            kind="ghost"
            size="small"
            renderIcon={(props: IconProps) => <Icon name="edit" {...props} />}
            onClick={() => { }}
          />
        </FlexBox>
      </FlexBox>
      <Divider />
      {footerItemsJSX}
    </Card>
  )
}
