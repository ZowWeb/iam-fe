import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import * as z from 'zod'

import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { StyledButton, StyledTextInput } from './styles'
import type { Team } from '~/types/data'
import Modal from '~/components/Modal'
import useUpdateTeam from '~/hooks/useUpdateTeam'

const displayNameMax: number = 50
const formSchema = z.object({
  displayName: z
    .string()
    .nonempty({ message: 'Name is mandatory' })
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
    register,
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
            <StyledTextInput
              {...register('displayName')}
              label="Team name"
              description={getCharsQty(displayNameInput?.length, displayNameMax)}
              error={errors.displayName && errors.displayName.message}
              inputWrapperOrder={['label', 'input', 'error', 'description']}
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
