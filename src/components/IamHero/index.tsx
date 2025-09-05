import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'

import { Wrapper, TitleWithActionWrapper, Title, Subtitle } from './styles'

type Props = {
  title: string
  subtitle?: string
  showActionButton?: boolean
  children?: React.ReactNode
  gap?: string
}

const IamHero = ({ title, subtitle, showActionButton = false, children, gap = '1.5rem' }: Props) => {
  return (
    <Wrapper direction="column" alignItems="flex-start" gap={gap}>
      <TitleWithActionWrapper>
        <Title>{title}</Title>
        {showActionButton && (
          <ButtonIcon
            surfaceType="colorFill"
            kind="lowContrast"
            size="large"
            renderIcon={(props: IconProps) => <Icon name="more-horizontal" {...props} />}
            onClick={() => {}}
          />
        )}
      </TitleWithActionWrapper>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Wrapper>
  )
}

export default IamHero
