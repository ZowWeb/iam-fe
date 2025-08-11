import { useMemo } from 'react'
import { Icon } from '@vds/icons'

import { StyledPill, StyledPillSecondary } from './styles'
import FlexBox from '~/components/FlexBox'

type PillProps = {
  variant?: 'dark' | 'error'
  withRemoveButton?: boolean
  onRemove?: (value: string) => void
  text: string
}

export default function Pill({
  variant = 'dark',
  withRemoveButton = true,
  onRemove = undefined,
  text,
}: PillProps) {
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
      <FlexBox>
        <StyledPillSecondary withRemoveButton={withRemoveButton} onRemove={() => handleRemovePill(text)}>
          <FlexBox>
            <Icon name="error" color="#B95319" size="small" />
            {text}
          </FlexBox>
        </StyledPillSecondary>
      </FlexBox>
    ),
    [withRemoveButton, onRemove, text],
  )

  const PillSchema = useMemo(
    () => ({
      dark: DarkPill,
      error: ErrorPill,
    }),
    [variant],
  )

  return <div>{PillSchema[variant]}</div>
}
