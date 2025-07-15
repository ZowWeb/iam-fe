import { useMemo } from 'react'
import { Icon } from '@vds/icons'

import { StyledPill, StyledPillSecondary } from './styles'
import FlexBox from '~/components/FlexBox'

type IamPillProps = {
  variant?: 'dark' | 'error'
  withRemoveButton?: boolean
  onRemove?: (value: string) => void
  text: string
}

export default function IamPill({
  variant = 'dark',
  withRemoveButton = true,
  onRemove = undefined,
  text,
}: IamPillProps) {
  const handleRemovePill = (value: string) => {
    if (onRemove) {
      onRemove(value)
    }
  }

  const DarkPill = useMemo(
    () => (
      <StyledPill withRemoveButton={withRemoveButton} onRemove={() => handleRemovePill(text)}>
        {text}
      </StyledPill>
    ),
    [withRemoveButton, onRemove, text],
  )

  const ErrorPill = useMemo(
    () => (
      <StyledPillSecondary withRemoveButton={withRemoveButton} onRemove={() => handleRemovePill(text)}>
        <FlexBox>
          <Icon name="error" color="#B95319" size="small" />
          {text}
        </FlexBox>
      </StyledPillSecondary>
    ),
    [withRemoveButton, onRemove, text],
  )

  const IamPillSchema = useMemo(
    () => ({
      dark: DarkPill,
      error: ErrorPill,
    }),
    [variant],
  )

  return <div>{IamPillSchema[variant]}</div>
}
