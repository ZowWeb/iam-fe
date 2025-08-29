type DeleteServiceAccountProps = {
  teamId: string
  serviceAccountId: string
}

const deleteServiceAccount = async ({ teamId, serviceAccountId }: DeleteServiceAccountProps) => {
  const response = await fetch(
    `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/service-accounts/${serviceAccountId}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error(
      `[deleteServiceAccount] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
    )
  }

  return response.text()
}

export default deleteServiceAccount
