import { styled } from '@linaria/react'
import { Button } from '@vds/buttons'

import Typography from '~/components/Typography'
import FlexBox from '~/components/FlexBox'

export const TeamTitle = styled(Typography.Span)`
  padding-top: 1.5rem;
`

export const TeamName = styled(Typography.Span)`
  line-height: 1.25rem;
  letter-spacing: 0.031rem;
  padding-top: 0.25rem;
`

export const ButtonsWrapper = styled(FlexBox)`
  padding-top: 1.5rem;
  gap: 0.75rem;
`

export const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
`
