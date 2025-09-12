import { styled } from '@linaria/react'

import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'

export const Wrapper = styled(FlexBox)`
  background: #f6f6f6;
  border-radius: 0.75rem;
  padding: 2rem 1.5rem;
`

export const TitleWithActionWrapper = styled(FlexBox)`
  justify-content: space-between;
`

export const Title = styled(Typography.H3)``

export const Right = styled(FlexBox)`
  justify-content: flex-end;
`
