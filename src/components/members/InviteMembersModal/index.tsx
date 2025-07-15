import { useState } from 'react'
import { Modal, PillsInput } from '@mantine/core'

import { StyledButton, StyledButtons, StyledPillGroup, StyledPillsInput, TeamName, TeamTitle } from './styles'
import { FONT_WEIGHTS } from '~/styles/constants'
import Typography from '~/components/Typography'
import IamPill from '../../IamPill'
import FlexBox from '~/components/FlexBox'

type InviteMembersModalProps = {
  opened: boolean
  onClose: () => void
}

export default function InviteMembersModal({ opened, onClose }: InviteMembersModalProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleRemovePill = () => {}
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      event.preventDefault()
      setInputValue('')
    }
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const handleCloseModal = () => {
    onClose()
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
      <FlexBox direction="column" alignItems="flex-start" gap="0">
        <Typography.H3>Invite members</Typography.H3>
        <Typography.H4>Only people with a valid email can be added to this team.</Typography.H4>
        <TeamTitle weight={FONT_WEIGHTS.bold}>Team Name</TeamTitle>
        <TeamName weight={FONT_WEIGHTS.medium}>This is the team name</TeamName>
        <StyledPillsInput label="Email address(es)">
          <StyledPillGroup>
            {[].map((element, idx) => {
              return (
                <IamPill
                  key={`${idx}${element}`}
                  withRemoveButton
                  onRemove={handleRemovePill}
                  text={element}
                  variant="dark"
                />
              )
            })}
            <PillsInput.Field
              onKeyDown={e => handleKeyDown(e)}
              value={inputValue}
              onChange={e => handleTextChange(e)}
            />
          </StyledPillGroup>
        </StyledPillsInput>

        <StyledButtons>
          <StyledButton size="large" disabled={false} onClick={handleCloseModal}>
            Send Invite
          </StyledButton>
          <StyledButton size="large" disabled={false} use="secondary" onClick={handleCloseModal}>
            Cancel
          </StyledButton>
        </StyledButtons>
      </FlexBox>
    </Modal>
  )
}
