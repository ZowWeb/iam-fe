import { styled } from '@linaria/react'
import { TextInput } from '@mantine/core'
import { Button } from '@vds/buttons'

import { COLORS, FONT_WEIGHTS } from '~/styles/constants'
import { theme } from '~/styles/theme'

export const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
`

export const StyledTextInput = styled(TextInput)`
  .mantine-Input-input {
    border-color: ${COLORS.secondary};
  }
  .mantine-TextInput-description {
    font-size: ${theme.fontSizes.sm};
    font-weight: ${FONT_WEIGHTS.medium};
    padding-top: 0.5rem;
  }
`
