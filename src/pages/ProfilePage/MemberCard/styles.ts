import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import { COLORS } from '~/styles/constants'

export const Card = styled(FlexBox)`
  border-radius: 0.75rem;
  background: ${COLORS.vdsGray95};
  padding: 1.25rem;
  flex: 0 1 calc(50% - 1.25rem);
`

export const FooterItem = styled(FlexBox)`
  flex: 0 1 calc(50% - 0.75rem);
`

export const Divider = styled.div`
  border: none;
  border-top: 1px solid ${COLORS.vdsGray85};
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1rem;
`
