import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'

import { Wrapper, TitleWithActionWrapper, Title, Right } from './styles'

type Props = {
  title: string
  showActionButton?: boolean
  children?: React.ReactNode
  gap?: string
}

export default function DetailsHeader({ title, showActionButton = false, children, gap = '1.5rem' }: Props) {
  return (
    <Wrapper direction="column" alignItems="flex-start" gap={gap}>
      <TitleWithActionWrapper alignItems="flex-start">
        <Title>{title}</Title>
        {showActionButton && (
          <Right>
            <ButtonIcon
              surfaceType="colorFill"
              kind="lowContrast"
              size="large"
              renderIcon={(props: IconProps) => <Icon name="more-horizontal" {...props} />}
              onClick={() => {}}
            />
          </Right>
        )}
      </TitleWithActionWrapper>
      {children}
    </Wrapper>
  )
}
