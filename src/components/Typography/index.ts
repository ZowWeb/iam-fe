import { styled } from '@linaria/react'
import { Title } from '@mantine/core'

import { FONT_WEIGHTS } from '~/styles/constants'
import { theme } from '~/styles/theme'

const Typography = {
  H1: styled(Title)`
    font-size: ${theme.fontSizes.xxl};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H2: styled(Title.withProps({ order: 2 }))`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H3: styled(Title.withProps({ order: 3 }))`
    font-size: ${theme.fontSizes.lg};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H4: styled(Title.withProps({ order: 4 }))`
    font-size: ${theme.fontSizes.md};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H5: styled(Title.withProps({ order: 5 }))`
    font-size: ${theme.fontSizes.sm};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H6: styled(Title.withProps({ order: 6 }))`
    font-size: ${theme.fontSizes.xs};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 2em;
  `,
  CustomTitle: styled(Title)``,
  Paragraph: styled.p`
    font-size: ${theme.fontSizes.md};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
    margin: 0;
  `,
  Small: styled.small<{ weight?: number }>`
    font-size: ${theme.fontSizes.sm};
    font-weight: ${props => props.weight || FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  Span: styled.span<{ size?: string | number; weight?: number }>`
    font-size: ${props => props.size || theme.fontSizes.md};
    font-weight: ${props => props.weight || FONT_WEIGHTS.normal};
    line-height: 1;
  `,
}

export default Typography
