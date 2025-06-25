import { styled } from '@linaria/react'

import { FLUID_LAYOUT_MAX_WIDTH, STD_LAYOUT_MAX_WIDTH } from '~/styles/constants'

export const LayoutWrapper = styled.div`
  width: 100%;

  &.layout--standard main {
    max-width: ${STD_LAYOUT_MAX_WIDTH};
    margin: 0 auto;
  }

  &.layout--fluid main {
    max-width: ${FLUID_LAYOUT_MAX_WIDTH};
    margin: 0 auto;
  }
`
