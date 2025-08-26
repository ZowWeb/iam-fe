import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { Description, Name, StyledButton, StyledButtons, Title } from './styles'
import type { ServiceAccount } from '~/types/data'
import useDeleteServiceAccount from '~/hooks/useDeleteServiceAccount'
import { FONT_WEIGHTS } from '~/styles/constants'
import Modal from '~/components/Modal'

type DeleteServiceAccountModalProps = {
  serviceAccount: ServiceAccount
  teamId: string
  opened: boolean
  onClose: () => void
  onSuccess: () => void
  onError: (error: unknown) => void
}

export default function DeleteServiceAccountModal({
  opened,
  onClose,
  serviceAccount,
  teamId,
  onSuccess,
  onError,
}: DeleteServiceAccountModalProps) {
  const { mutate } = useDeleteServiceAccount({ teamId })

  const handleCloseModal = () => {
    onClose()
  }

  const handleYesClick = () => {
    mutate(serviceAccount.id, {
      onSettled: () => handleCloseModal(),
      onSuccess: () => onSuccess(),
      onError: error => onError(error),
    })
  }

  return (
    <Modal opened={opened} onClose={onClose}>
      <FlexBox direction="column" alignItems="flex-start" gap="0">
        <Typography.H3>Delete service account?</Typography.H3>
        <Title weight={FONT_WEIGHTS.bold}>Service account</Title>
        <Name weight={FONT_WEIGHTS.medium}>{serviceAccount.displayName}</Name>
        <Description>
          Once the service account is removed, all team members will lose access to all its credentials.
        </Description>

        <StyledButtons>
          <StyledButton size="large" onClick={handleYesClick}>
            Yes
          </StyledButton>
          <StyledButton size="large" use="secondary" onClick={handleCloseModal}>
            No
          </StyledButton>
        </StyledButtons>
      </FlexBox>
    </Modal>
  )
}
