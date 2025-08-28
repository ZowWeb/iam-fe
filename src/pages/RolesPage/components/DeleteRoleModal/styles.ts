import { styled } from '@linaria/react'
import { Button } from '@vds/buttons'

import Typography from '~/components/Typography'

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
`

export const Description = styled(Typography.Span)`
  line-height: 1.25rem;
  letter-spacing: 0.031rem;
`
