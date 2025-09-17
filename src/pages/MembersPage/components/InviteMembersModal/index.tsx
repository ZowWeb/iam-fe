import { useState } from 'react'
import { Modal } from '@mantine/core'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import * as z from 'zod'

import { StyledButton, ButtonsWrapper, TeamName, TeamTitle } from './styles'
import { FONT_WEIGHTS } from '~/styles/constants'
import Typography from '~/components/Typography'
import Pill from '~/components/Pill'
import FlexBox from '~/components/FlexBox'
import { usePills, type Pill as TPill } from '../../hooks/usePills'
import PillsInput from '~/components/PillsInput'
import useInviteMember from '~/hooks/useInviteMember'
import type { InviteMember } from '~/types/data'

export const emailsArraySchema = z
  .array(z.email('Invalid email!'))
  .min(1, 'Please add at least one email!')
  .refine(arr => new Set(arr).size === arr.length, {
    message: 'Email address is already added!',
  })

const formSchema = z.object({
  emailsArray: emailsArraySchema,
})

type FormSchema = z.infer<typeof formSchema>

const getPillVariantFromError = (pill: TPill) => {
  if (pill.error) return 'error'
  if (emailsArraySchema.safeParse([pill.email]).success) return 'default'
  return 'error'
}

type InviteMembersModalProps = {
  teamId: string
  opened: boolean
  onClose: () => void
  onSuccess: () => void
  onError: (error: unknown) => void
}

export default function InviteMembersModal({
  opened,
  teamId,
  onClose,
  onSuccess,
  onError,
}: InviteMembersModalProps) {
  const { mutate, isPending } = useInviteMember({ teamId })
  const [inputValue, setInputValue] = useState<string>('')
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      isValid,
      errors: { emailsArray: emailsArrayError },
    },
    getValues,
  } = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema), // zodResolver not yet supported & stable re: https://github.com/react-hook-form/resolvers/issues/768
    mode: 'onChange',
  })
  const { pills, addPill, removePill, resetPills } = usePills({ emailsArray: getValues().emailsArray })
  const getErrorMessage = () => {
    if (!emailsArrayError) return null
    if (emailsArrayError.message) return emailsArrayError.message
    if (Array.isArray(emailsArrayError)) {
      return emailsArrayError.filter(Boolean).at(0).message as string
    }
    return 'Something went wrong, please check your input!'
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldOnChange: (value: string[]) => void,
  ) => {
    const validValue = inputValue.trim()
    if (event.key === 'Enter' && validValue) {
      event.preventDefault()
      addPill(validValue, fieldOnChange)
      setInputValue('')
    }
  }

  const handleCloseModal = () => {
    reset() // Reset the form state
    resetPills() // Reset the inner pills state
    onClose()
  }

  const onSubmit: SubmitHandler<FormSchema> = ({ emailsArray }) => {
    const newData: InviteMember = {
      // TODO: Temporary use the first element until the endpoint receives an array of emails
      email: emailsArray[0],
    }
    mutate(newData, {
      onSuccess,
      onError,
      onSettled: handleCloseModal,
    })
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      styles={{ body: { padding: '3rem' }, root: { width: '500px' } }}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox direction="column" alignItems="flex-start" gap="0">
          <Typography.H3>Invite members</Typography.H3>
          <Typography.H4>Only people with a valid email can be added to this team.</Typography.H4>
          <TeamTitle weight={FONT_WEIGHTS.bold}>Team Name</TeamTitle>
          <TeamName weight={FONT_WEIGHTS.medium}>This is the team name</TeamName>
          <Controller
            name="emailsArray"
            control={control}
            render={({ field }) => (
              <PillsInput label="Email address(es)" errorMsg={getErrorMessage()}>
                <Pill.Group>
                  {pills.map(pill => (
                    <Pill
                      key={pill.id}
                      withRemoveButton
                      onRemove={() => removePill(pill, field.onChange)}
                      variant={getPillVariantFromError(pill)}
                    >
                      {pill.shortenedEmail}
                    </Pill>
                  ))}
                  <PillsInput.Field
                    onKeyDown={e => handleKeyDown(e, field.onChange)}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                </Pill.Group>
              </PillsInput>
            )}
          />
          <ButtonsWrapper>
            <StyledButton size="large" disabled={!isValid || isPending} type="submit">
              Send Invite
            </StyledButton>
            <StyledButton
              size="large"
              disabled={isPending}
              use="secondary"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </StyledButton>
          </ButtonsWrapper>
        </FlexBox>
      </form>
    </Modal>
  )
}
