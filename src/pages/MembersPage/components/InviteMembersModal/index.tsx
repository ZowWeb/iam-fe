import { useState } from 'react'
import { Modal } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import * as z from 'zod'

import { StyledButton, ButtonsWrapper, TeamName, TeamTitle } from './styles'
import { FONT_WEIGHTS } from '~/styles/constants'
import Typography from '~/components/Typography'
import Pill from '~/components/Pill'
import FlexBox from '~/components/FlexBox'
import { usePills, type Pill as PillType } from '../../hooks/usePills'
import PillsInput from '~/components/PillsInput'

export const emailListSchema = z
  .array(z.email('Invalid email!'))
  .min(1, 'Please add at least one email!')
  .refine(arr => new Set(arr).size === arr.length, {
    message: 'Email address is already added!',
  })

const formSchema = z.object({
  emailList: emailListSchema,
})

type FormSchema = z.infer<typeof formSchema>

const getPillVariantFromError = (pill: PillType): 'default' | 'error' => {
  if (pill.error) return 'error'
  if (emailListSchema.safeParse([pill.email]).success) return 'default'
  return 'error'
}

type InviteMembersModalProps = {
  opened: boolean
  onClose: () => void
}

export default function InviteMembersModal({ opened, onClose }: InviteMembersModalProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      isValid,
      errors: { emailList: emailListError },
    },
    getValues,
  } = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema), // zodResolver not yet supported & stable re: https://github.com/react-hook-form/resolvers/issues/768
    mode: 'onChange',
    defaultValues: { emailList: ['john@doe.com'] },
  })
  const { pills, addPill, removePill, resetPills } = usePills({ emailList: getValues().emailList })
  const getErrorMessage = () => {
    if (!emailListError) return null
    if (emailListError.message) return emailListError.message
    if (Array.isArray(emailListError)) {
      return emailListError.filter(Boolean).at(0).message as string
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

  const onSubmit = () => {
    handleCloseModal()
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
            name="emailList"
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
            <StyledButton size="large" disabled={!isValid} type="submit">
              Send Invite
            </StyledButton>
            <StyledButton size="large" use="secondary" onClick={handleCloseModal}>
              Cancel
            </StyledButton>
          </ButtonsWrapper>
        </FlexBox>
      </form>
    </Modal>
  )
}
