import { styled } from '@linaria/react'

import FlexBox from '../FlexBox'
import { FLUID_LAYOUT_MAX_WIDTH, STD_LAYOUT_MAX_WIDTH } from '~/styles/constants'

export const BlockWrapper = styled(FlexBox)`
  width: 100%;
  margin: 0 auto;

  .layout--standard & {
    max-width: ${STD_LAYOUT_MAX_WIDTH};
  }
  .layout--fluid & {
    max-width: ${FLUID_LAYOUT_MAX_WIDTH};
  }

  > * {
    width: 100%;
  }
`
