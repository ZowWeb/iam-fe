import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'
import { useCallback } from 'react'

import { Wrapper, Header, FooterItem } from './styles'
import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { FONT_WEIGHTS } from '~/styles/constants'

export type FooterItems = {
  label: string
  value: string
}

type Props = {
  title: string
  onEdit?: () => void
  footerItems: FooterItems[]
}

export default function ProfileCard({ title, onEdit, footerItems }: Props) {
  const footerItemsJSX = useCallback(
    () => (
      <FlexBox alignItems="center" gap="1.5rem" wrap>
        {footerItems.map(item => (
          <FooterItem key={item.label} gap="0.5rem" direction="column" alignItems="flex-start">
            <Typography.Span weight={FONT_WEIGHTS.bold} size="1rem">
              {item.label}
            </Typography.Span>
            <Typography.Span weight={FONT_WEIGHTS.medium} size="1rem">
              {item.value}
            </Typography.Span>
          </FooterItem>
        ))}
      </FlexBox>
    ),
    [footerItems],
  )

  return (
    <Wrapper direction="column" alignItems="flex-start" gap="1.5rem">
      <Header alignItems="center">
        <Typography.CustomTitle order={4} size="1.5rem">
          {title}
        </Typography.CustomTitle>
        {onEdit && (
          <FlexBox justifyContent="flex-end">
            <ButtonIcon
              kind="ghost"
              size="small"
              renderIcon={(props: IconProps) => <Icon name="edit" {...props} />}
              onClick={onEdit}
            />
          </FlexBox>
        )}
      </Header>
      {footerItemsJSX()}
    </Wrapper>
  )
}
