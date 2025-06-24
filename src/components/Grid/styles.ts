import { styled } from '@linaria/react'
import { Grid } from '@mantine/core'

import { FLUID_LAYOUT_MAX_WIDTH, STD_LAYOUT_MAX_WIDTH } from '~/styles/constants'

export const StandardGridWrapper = styled(Grid)`
  max-width: ${STD_LAYOUT_MAX_WIDTH};
  margin: 0 auto;
`

export const FluidGridWrapper = styled(Grid)`
  max-width: ${FLUID_LAYOUT_MAX_WIDTH};
  margin: 0 auto;
`
