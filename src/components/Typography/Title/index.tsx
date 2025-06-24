import { styled } from '@linaria/react'
import { Title } from '@mantine/core'

import { FONT_WEIGHTS } from '~/styles/constants'
import { theme } from '~/styles/theme'

const Typography = {
  H1: styled(Title)`
    font-size: ${theme.fontSizes?.['2xl'] || '4rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H2: styled(Title)`
    font-size: ${theme.fontSizes?.xl || '3rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H3: styled(Title)`
    font-size: ${theme.fontSizes?.lg || '2rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H4: styled(Title)`
    font-size: ${theme.fontSizes?.md || '1rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H5: styled(Title)`
    font-size: ${theme.fontSizes?.sm || '0.875rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  H6: styled(Title)`
    font-size: ${theme.fontSizes?.xs || '0.75rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 2em;
  `,
  CustomTitle: styled(Title)`
    font-size: ${props => props.size || theme.fontSizes?.md || '1rem'};
    font-weight: ${props => props.weight || FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
  Paragraph: styled.p`
    font-size: ${theme.fontSizes?.md || '1rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
    margin: 0;
  `,
  Small: styled.small`
    font-size: ${theme.fontSizes?.sm || '0.875rem'};
    font-weight: ${FONT_WEIGHTS.normal};
    line-height: 1.5em;
  `,
}

export default Typography
