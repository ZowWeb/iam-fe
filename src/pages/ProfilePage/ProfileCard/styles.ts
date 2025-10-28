import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import { COLORS } from '~/styles/constants'
import { theme } from '~/styles/theme'

export const Wrapper = styled(FlexBox)`
  padding: ${theme.spacing.x8};
  background: ${COLORS.vdsGray95};
  border-radius: 0.75rem;
  min-height: 250px;
  flex: 1;
`

export const Header = styled(FlexBox)`
  padding-bottom: ${theme.spacing.x4};
  border-bottom: 1px solid ${COLORS.vdsGray85};
`

export const FooterItem = styled(FlexBox)`
  flex: 1;
`

export const Divider = styled.div`
  border: none;
  border-top: 1px solid ${COLORS.vdsGray85};
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;
`
