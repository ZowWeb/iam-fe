import { styled } from '@linaria/react'

import { FLUID_LAYOUT_MAX_WIDTH, STD_LAYOUT_MAX_WIDTH } from '~/styles/constants'

export const Main = styled.main<{ type?: 'standard' | 'fluid' }>`
  max-width: ${({ type }) => (type === 'standard' ? STD_LAYOUT_MAX_WIDTH : FLUID_LAYOUT_MAX_WIDTH)};
  margin: 0 auto;
`
