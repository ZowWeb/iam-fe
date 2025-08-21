import {
  PillsInput as MantinePillsInput,
  type PillsInputProps as MantinePillsInputProps,
} from '@mantine/core'

import IconMessage from '~/components/IconMessage'
import FlexBox from '../FlexBox'
import { StyledPillsInput } from './styles'

type Props = Omit<MantinePillsInputProps, 'error'> & {
  errorMsg?: string | null
}

const PillsInput = (props: Props) => {
  const { children, errorMsg, ...rest } = props
  return (
    <FlexBox direction="column" gap="0.5rem">
      <StyledPillsInput {...rest}>{children}</StyledPillsInput>
      <IconMessage text={errorMsg} />
    </FlexBox>
  )
}

PillsInput.Field = MantinePillsInput.Field

export default PillsInput
