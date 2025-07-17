/* eslint-disable */
import { useState } from 'react'
import { Modal, PillsInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { StyledButton, StyledButtons, StyledPillGroup, StyledPillsInput, TeamName, TeamTitle } from './styles'
import { FONT_WEIGHTS } from '~/styles/constants'
import Typography from '~/components/Typography'
import IamPill from '../../../IamPill'
import FlexBox from '~/components/FlexBox'
import { truncateMaxedOutText } from '~/utils'

const formSchema = z.object({
  emailList: z.array(z.email('Invalid email')).min(1, 'Please add at least one email'),
})
type FormSchema = z.infer<typeof formSchema>
type InviteMembersModalProps = {
  opened: boolean
  onClose: () => void
}

export default function InviteMembersModal({ opened, onClose }: InviteMembersModalProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { emailList: ['dummy@verizoncom'] },
  })

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldOnChange: (value: string[]) => void,
  ) => {
    if (event.key === 'Enter' && inputValue) {
      event.preventDefault()
      addEmail(inputValue, fieldOnChange)
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleCloseModal = () => {
    onClose()
  }

  const onSubmit = data => {
    handleCloseModal()
  }

  const addEmail = (email: string, fieldOnChange: (value: string[]) => void) => {
    if (email?.trim()) {
      const currentEmails = getValues('emailList')
      const updatedEmails = [...currentEmails, email.trim()]
      fieldOnChange(updatedEmails)
      setInputValue('')
    }
  }

  const removeEmail = (emailToRemove: string, fieldOnChange: (value: string[]) => void) => {
    const currentEmails = getValues('emailList')
    const updatedEmails = currentEmails.filter(email => email !== emailToRemove)
    fieldOnChange(updatedEmails)
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
              <StyledPillsInput label="Email address(es)">
                <StyledPillGroup>
                  {field.value.map((element, idx) => {
                    const variant = 'dark'
                    const truncated = truncateMaxedOutText(element)
                    return (
                      <IamPill
                        key={`${idx}${element}`}
                        withRemoveButton
                        onRemove={e => removeEmail(e, field.onChange)}
                        text={truncated}
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
