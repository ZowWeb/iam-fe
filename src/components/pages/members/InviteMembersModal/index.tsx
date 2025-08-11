import { useEffect, useState } from 'react'
import { Modal, PillsInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { ZodType } from 'zod'

import { StyledButton, StyledButtons, StyledPillGroup, StyledPillsInput, TeamName, TeamTitle } from './styles'
import { FONT_WEIGHTS } from '~/styles/constants'
import Typography from '~/components/Typography'
import IamPill from '../../../IamPill'
import FlexBox from '~/components/FlexBox'
import { usePills, type Pill } from '~/hooks/pages/members/usePills'
import ErrorMessage from '~/components/pages/members/ErrorMessage'

const uniqueArray = (schema: ZodType) => {
  return z.array(schema).refine(items => new Set(items).size === items.length, {
    message: 'All items must be unique, no duplicate values allowed',
  })
}

const formSchema = z.object({
  emailList: uniqueArray(z.email('Invalid email')).min(1, 'Please add at least one email'),
})
type FormSchema = z.infer<typeof formSchema>
type InviteMembersModalProps = {
  opened: boolean
  onClose: () => void
}

export default function InviteMembersModal({ opened, onClose }: InviteMembersModalProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const { pills, errorMessage, addPill, removePill, resetPills } = usePills()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { emailList: ['dummy@verizoncom'] },
  })

  const handleRemovePillClick = (pill: Pill, fieldOnChange: (value: string[]) => void) => {
    removePill(pill, fieldOnChange)
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

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleCloseModal = () => {
    onClose()
  }

  const onSubmit = () => {
    handleCloseModal()
  }

  /**
   * Reset form when open state changes.
   * TODO: Remove when integrating with API
   */
  useEffect(() => {
    if (opened) {
      reset() // Reset the form state
      resetPills() // Reset the inner pills state
    }
  }, [opened])

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
              <>
                <StyledPillsInput label="Email address(es)">
                  <StyledPillGroup>
                    {pills.map(pill => {
                      const hasErrors = pill.errors.length > 0 // Checks the errors array
                      const variant = hasErrors ? 'error' : 'dark'

                      return (
                        <IamPill
                          key={pill.id}
                          withRemoveButton
                          onRemove={() => handleRemovePillClick(pill, field.onChange)}
                          text={pill.shortenedEmail}
                          variant={variant}
                        />
                      )
                    })}
                    <PillsInput.Field
                      onKeyDown={e => handleKeyDown(e, field.onChange)}
                      value={inputValue}
                      onChange={e => handleTextChange(e)}
                    />
                  </StyledPillGroup>
                </StyledPillsInput>
                {errorMessage && <ErrorMessage text={errorMessage} />}
              </>
            )}
          />

          <StyledButtons>
            <StyledButton size="large" disabled={!isValid} type="submit">
              Send Invite
            </StyledButton>
            <StyledButton size="large" use="secondary" onClick={handleCloseModal}>
              Cancel
            </StyledButton>
          </StyledButtons>
        </FlexBox>
      </form>
    </Modal>
  )
}
