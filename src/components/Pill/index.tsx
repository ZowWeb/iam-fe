import { useMemo } from 'react'
import { Pill as MantinePill, type PillProps } from '@mantine/core'

import { SolidPill, DashedPill } from './styles'
import IconMessage from '~/components/IconMessage'

export type PillVariant = 'default' | 'error'

type Props = PillProps & {
  variant?: PillVariant
}

const Pill = ({ children, ...props }: Props) => {
  const { id, variant = 'default', onRemove, ...rest } = props

  const DefaultPill = useMemo(
    () => (
      <SolidPill onRemove={onRemove} {...rest}>
        {children}
      </SolidPill>
    ),
    [variant],
  )

  const ErrorPill = useMemo(
    () => (
      <DashedPill onRemove={onRemove} data-variant="error" {...rest}>
        <IconMessage type="error" text={children} />
      </DashedPill>
    ),
    [variant],
  )

  if (variant === 'error') {
    return ErrorPill
  }

  return DefaultPill
}

Pill.Group = MantinePill.Group

export default Pill
