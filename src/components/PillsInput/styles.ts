import { styled } from '@linaria/react'
import { PillsInput } from '@mantine/core'

import { COLORS } from '~/styles/constants'

export const StyledPillsInput = styled(PillsInput)`
  width: 100%;
  padding-top: 1.5rem;
  .mantine-Input-input {
    border-color: ${COLORS.secondary};
    padding: 0.75rem;
  }
`
