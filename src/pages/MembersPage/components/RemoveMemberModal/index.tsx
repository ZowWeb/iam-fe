import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { Description, Name, StyledButton, Title } from './styles'
import type { Member } from '~/types/data'
import { FONT_WEIGHTS } from '~/styles/constants'
import Modal from '~/components/Modal'
import useRemoveMember from '~/hooks/useRemoveMember'

type Props = {
  member: Member
  teamId: string
  opened: boolean
  onClose: () => void
  onSuccess: (policyTagName: string) => void
  onError: (error: unknown) => void
}

export default function RemoveMemberModal({ opened, onClose, member, teamId, onSuccess, onError }: Props) {
  const { mutate, isPending } = useRemoveMember({ teamId })

  const handleCloseModal = () => {
    onClose()
  }

  const handleYesClick = () => {
    mutate(member.id, {
      onSuccess: () => onSuccess(member.displayName),
      onError,
      onSettled: handleCloseModal,
    })
  }

  return (
    <Modal opened={opened} onClose={onClose}>
      <FlexBox direction="column" alignItems="flex-start" gap="2rem">
        <Typography.H3>Remove member?</Typography.H3>
        <FlexBox direction="column" alignItems="flex-start">
          <Title weight={FONT_WEIGHTS.bold}>Member</Title>
          <Name weight={FONT_WEIGHTS.medium}>{member.displayName}</Name>
        </FlexBox>
        <Description>
          Once this member is removed the only way they will have access to this team is if they are
          reinvited.
        </Description>
        <FlexBox gap="0.75rem">
          <StyledButton size="large" onClick={handleYesClick} disabled={isPending}>
            Yes
          </StyledButton>
          <StyledButton size="large" use="secondary" onClick={handleCloseModal} disabled={isPending}>
            No
          </StyledButton>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}
