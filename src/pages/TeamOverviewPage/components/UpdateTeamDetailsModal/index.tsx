import { useEffect } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import * as z from 'zod'
import { Input } from '@vds/inputs'

import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { CharCounter, InputContainer, StyledButton } from './styles'
import type { Team } from '~/types/data'
import Modal from '~/components/Modal'
import useUpdateTeam from '~/hooks/useUpdateTeam'
import { theme } from '~/styles/theme'

const requiredFieldMessage: string = 'Required field'
const displayNameMax: number = 50
const formSchema = z.object({
  displayName: z
    .string()
    .nonempty({ message: requiredFieldMessage })
    .max(displayNameMax)
    .min(10, { error: 'Must be at least # characters' }),
})
type FormSchema = z.infer<typeof formSchema>

type Props = {
  teamId: string
  team: Team
  opened: boolean
  onClose: () => void
  onSuccess: () => void
  onError: (error: unknown) => void
}

const getCharsQty = (length: number, max: number): string => {
  return `${length}/${max}`
}

export default function UpdateTeamDetailsModal({ opened, onClose, teamId, team, onSuccess, onError }: Props) {
  const { mutate, isPending } = useUpdateTeam({ teamId })
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: { displayName: team.displayName },
    mode: 'onChange',
  })

  // Watch for changes
  const displayNameInput = watch('displayName')

  const handleCloseModal = () => {
    onClose()
  }

  const onSubmit: SubmitHandler<FormSchema> = data => {
    const newData = {
      displayName: data.displayName,
    } as Team
    mutate(newData, {
      onSuccess,
      onError,
      onSettled: handleCloseModal,
    })
  }

  /**
   * Reset form when open state changes to avoid previous values when modal is reopened
   */
  useEffect(() => {
    if (opened) {
      reset() // Reset the form state
    }
  }, [opened])

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox direction="column" alignItems="flex-start" gap="1.5rem">
          <Typography.H3>Update team details</Typography.H3>
          <FlexBox direction="column" alignItems="flex-start" gap="0.75">
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <InputContainer withError={!!errors.displayName}>
                  <Input
                    {...field}
                    label="Team name"
                    error={!!errors.displayName?.message}
                    errorText={errors.displayName?.message || requiredFieldMessage}
                  />
                  <CharCounter>
                    <Typography.Span size={theme.fontSizes.sm}>
                      {getCharsQty(displayNameInput?.length, displayNameMax)}
                    </Typography.Span>
                  </CharCounter>
                </InputContainer>
              )}
            />
          </FlexBox>
          <FlexBox gap="0.75rem">
            <StyledButton size="large" disabled={!isValid || isPending} type="submit">
              Update
            </StyledButton>
            <StyledButton
              size="large"
              use="secondary"
              type="button"
              disabled={isPending}
              onClick={() => handleCloseModal()}
            >
              Cancel
            </StyledButton>
          </FlexBox>
        </FlexBox>
      </form>
    </Modal>
  )
}
