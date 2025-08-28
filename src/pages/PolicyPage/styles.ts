import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { COLORS } from '~/styles/constants'

export const FooterContainer = styled(FlexBox)`
  gap: 3.25rem;
  flex: 0 1 auto;
`

export const FooterItemWrapper = styled(FlexBox)`
  flex: 0 1 max-content;
  gap: 0.5rem;
  word-break: break-all;
`

export const Label = styled(Typography.Span)`
  font-size: 0.875rem;
  font-weight: 700;
`

export const Value = styled(Typography.Span)`
  font-size: 0.875rem;
`

export const StyledCodeBlock = styled.div`
  margin-top: 2.5rem;
`

export const Subtitle = styled(Typography.Span)`
  line-height: 1.25rem;
  letter-spacing: 0.031rem;
  color: ${COLORS.secondary};
`
