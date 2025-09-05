import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import { COLORS } from '~/styles/constants'

export const Card = styled(FlexBox)`
  border-radius: 0.75rem;
  border: 0.063rem solid ${COLORS.vdsGray85};
  width: 384px;
  min-height: 222px;
  padding: 1.25rem;
`

export const Divider = styled.div`
  border: none;
  border-top: 1px solid ${COLORS.vdsGray85};
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1rem;
`
