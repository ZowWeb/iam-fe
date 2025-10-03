import { styled } from '@linaria/react'
import { Textarea, TextInput } from '@mantine/core'
import { Button } from '@vds/buttons'

import { COLORS, FONT_WEIGHTS } from '~/styles/constants'
import { theme } from '~/styles/theme'

export const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
`

export const StyledTextInput = styled(TextInput)`
  width: 100%;
  .mantine-TextInput-input {
    border-color: ${COLORS.secondary};
    width: 100%;
  }
  .mantine-TextInput-description {
    font-size: ${theme.fontSizes.sm};
    font-weight: ${FONT_WEIGHTS.medium};
    padding-top: 0.5rem;
    text-align: right;
  }
`

export const StyledTextArea = styled(Textarea)`
  width: 100%;
  .mantine-Textarea-input {
    border-color: ${COLORS.secondary};
  }
  .mantine-Textarea-description {
    font-size: ${theme.fontSizes.sm};
    font-weight: ${FONT_WEIGHTS.medium};
    padding-top: 0.5rem;
    text-align: right;
  }
`
