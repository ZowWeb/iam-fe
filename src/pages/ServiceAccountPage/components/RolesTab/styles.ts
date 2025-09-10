import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import { COLORS } from '~/styles/constants'

export const Card = styled(FlexBox)`
  border-radius: 0.75rem;
  border: 0.063rem dotted ${COLORS.vdsGray85};
  min-height: 290px;
  padding: 1.25rem;
`

export const Width = styled.div`
  width: 45% !important;
  padding-bottom: 1.5rem;
`
