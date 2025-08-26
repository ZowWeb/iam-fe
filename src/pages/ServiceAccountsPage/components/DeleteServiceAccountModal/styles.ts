import { styled } from '@linaria/react'
import { Button } from '@vds/buttons'

import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'

export const StyledButtons = styled(FlexBox)`
  padding-top: 1.5rem;
  gap: 0.75rem;
`

export const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
`

export const Title = styled(Typography.Span)`
  padding-top: 1.5rem;
`

export const Name = styled(Typography.Span)`
  line-height: 1.25rem;
  letter-spacing: 0.031rem;
  padding-top: 0.25rem;
`

export const Description = styled(Typography.Span)`
  line-height: 1.25rem;
  letter-spacing: 0.031rem;
  padding-top: 1.5rem;
`
