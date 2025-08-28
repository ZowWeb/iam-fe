import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import { Description, Name, StyledButton, Title } from './styles'
import type { ServiceAccount } from '~/types/data'
import useDeleteServiceAccount from '~/hooks/useDeleteServiceAccount'
import { FONT_WEIGHTS } from '~/styles/constants'
import Modal from '~/components/Modal'

type DeleteServiceAccountModalProps = {
  serviceAccount: ServiceAccount
  teamId: string
  opened: boolean
  onClose: () => void
  onSuccess: (displayName: string) => void
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
  const { mutate, isPending } = useDeleteServiceAccount({ teamId })

  const handleCloseModal = () => {
    onClose()
  }

  const handleYesClick = () => {
    mutate(serviceAccount.id, {
      onSuccess: () => onSuccess(serviceAccount.displayName),
      onError,
      onSettled: handleCloseModal,
    })
  }

  return (
    <Modal opened={opened} onClose={onClose}>
      <FlexBox direction="column" alignItems="flex-start" gap="2rem">
        <Typography.H3>Delete service account?</Typography.H3>
        <FlexBox direction="column" alignItems="flex-start">
          <Title weight={FONT_WEIGHTS.bold}>Service account</Title>
          <Name weight={FONT_WEIGHTS.medium}>{serviceAccount.displayName}</Name>
        </FlexBox>
        <Description>
          Once the service account is removed, all team members will lose access to all its credentials.
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
