import { styled } from '@linaria/react'
import { Pill } from '@mantine/core'

import { COLORS, FONT_WEIGHTS } from '~/styles/constants'
import { theme } from '~/styles/theme'

const pillStyles = `
  font-size: ${theme.fontSizes.sm};
  font-weight: ${FONT_WEIGHTS.medium};
`

export const SolidPill = styled(Pill)`
  ${pillStyles}
  color: ${COLORS.white};
  background-color: ${COLORS.black};
`

export const DashedPill = styled(Pill)`
  ${pillStyles}
  color: ${COLORS.black};
  background-color: ${COLORS.vdsGray95};
  border: 0.5px dashed ${COLORS.black};

  .mantine-Pill-label > div {
    height: 100%;
  }
`
