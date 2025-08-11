import { styled } from '@linaria/react'
import { Pill } from '@mantine/core'

import { COLORS } from '~/styles/constants'

export const StyledPill = styled(Pill)`
  background-color: black;
  color: white;
`

export const StyledPillSecondary = styled(Pill)`
  background-color: ${COLORS.vdsGray95};
  color: black;
  border-style: dashed;
  border-color: black;
  border-width: 0.031rem;
`
