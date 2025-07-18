import { ButtonIcon } from '@vds/button-icons'

import { Wrapper, TitleWithActionWrapper, Title, Subtitle } from './styles'

type Props = {
  title: string
  subtitle?: string
  showActionButton?: boolean
  children?: React.ReactNode
}

const IamHero = ({ title, subtitle, showActionButton = false, children }: Props) => {
  return (
    <Wrapper direction="column" alignItems="flex-start" gap="1.5rem">
      <TitleWithActionWrapper>
        <Title>{title}</Title>
        {showActionButton && (
          <ButtonIcon
            surfaceType="colorFill"
            kind="lowContrast"
            size="large"
            renderIcon={() => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-dots"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              </svg>
            )}
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
