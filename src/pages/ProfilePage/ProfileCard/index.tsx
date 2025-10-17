import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'
import { Card, Divider, FooterItem } from './styles'
import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { FONT_WEIGHTS } from '~/styles/constants'
import { useCallback } from 'react'


export type FooterItems = {
  label: string
  value: string
}

type Props = {
  title: string
  footerItems: FooterItems[]
}

export default function ProfileCard({ title, footerItems }: Props) {
  const footerItemsJSX = useCallback(() => (
    <FlexBox alignItems="center" gap='1.5rem' wrap={true}>
      {footerItems.map(item => (
        <FooterItem key={item.label} gap="0.5rem" direction='column' alignItems='flex-start'>
          <Typography.Span weight={FONT_WEIGHTS.bold} size="1rem">
            {item.label}
          </Typography.Span>
          <Typography.Span weight={FONT_WEIGHTS.medium} size="1rem">
            {item.value}
          </Typography.Span>
        </FooterItem>
      ))}
    </FlexBox>
  ), [footerItems])

  return (
    <Card direction="column" alignItems="flex-start" gap="0">
      <FlexBox alignItems="center">
        <Typography.Span weight={FONT_WEIGHTS.bold} size="1.5rem">{title}</Typography.Span>
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
      {footerItemsJSX()}
    </Card>
  )
}
