import { styled } from '@linaria/react'
import { Grid } from '@mantine/core'

import { FLUID_LAYOUT_MAX_WIDTH, STD_LAYOUT_MAX_WIDTH } from '~/styles/constants'

export const GridWrapper = styled(Grid)`
  width: 100%;

  .layout--standard & {
    max-width: ${STD_LAYOUT_MAX_WIDTH};
  }
  .layout--fluid & {
    max-width: ${FLUID_LAYOUT_MAX_WIDTH};
  }
`
