import { styled } from '@linaria/react'
import { TextInput } from '@mantine/core'
import { Button } from '@vds/buttons'

import FlexBox from '~/components/FlexBox'
import { COLORS, FONT_WEIGHTS } from '~/styles/constants'
import { theme } from '~/styles/theme'

export const StyledButtons = styled(FlexBox)`
  padding-top: 1.5rem;
  gap: 0.75rem;
`

export const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
`

export const StyledTextInput = styled(TextInput)`
  padding-top: 0.5rem;
  .mantine-Input-input {
    border-color: ${COLORS.secondary};
  }
  .mantine-TextInput-description {
    font-size: ${theme.fontSizes.sm};
    font-weight: ${FONT_WEIGHTS.medium};
    padding-top: 0.5rem;
  }
`
