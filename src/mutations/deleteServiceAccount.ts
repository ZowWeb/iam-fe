type DeleteServiceAccountProps = {
  teamId: string
  serviceAccountId: string
}

export const deleteServiceAccount = async ({
  teamId,
  serviceAccountId,
}: DeleteServiceAccountProps): Promise<void> => {
  const response = await fetch(
    `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/service-accounts/${serviceAccountId}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error('Failed to delete service account')
  }
}
