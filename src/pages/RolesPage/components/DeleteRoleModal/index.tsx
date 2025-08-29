import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { Description, Name, StyledButton, Title } from './styles'
import type { PolicyTag } from '~/types/data'
import useDeletePolicyTag from '~/hooks/useDeletePolicyTag'
import { FONT_WEIGHTS } from '~/styles/constants'
import Modal from '~/components/Modal'

type DeleteRoleModalProps = {
  policyTag: PolicyTag
  teamId: string
  opened: boolean
  onClose: () => void
  onSuccess: (policyTagName: string) => void
  onError: (error: unknown) => void
}

export default function DeleteRoleModal({
  opened,
  onClose,
  policyTag,
  teamId,
  onSuccess,
  onError,
}: DeleteRoleModalProps) {
  const { mutate, isPending } = useDeletePolicyTag({ teamId })

  const handleCloseModal = () => {
    onClose()
  }

  const handleYesClick = () => {
    mutate(policyTag.policyTagId, {
      onSuccess: () => onSuccess(policyTag.policyTagName),
      onError,
      onSettled: handleCloseModal,
    })
  }

  return (
    <Modal opened={opened} onClose={onClose}>
      <FlexBox direction="column" alignItems="flex-start" gap="2rem">
        <Typography.H3>Delete role?</Typography.H3>
        <Title weight={FONT_WEIGHTS.bold}>Role</Title>
        <Name weight={FONT_WEIGHTS.medium}>{policyTag.policyTagName}</Name>
        <Description>Delete role description. (To be defined).</Description>
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
