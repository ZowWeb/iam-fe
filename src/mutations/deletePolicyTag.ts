type DeletePolicyTagProps = {
  teamId: string
  policyTagId: string
}

export const deletePolicyTag = async ({ teamId, policyTagId }: DeletePolicyTagProps): Promise<void> => {
  const response = await fetch(
    `https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/policy-tags/${policyTagId}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error(
      `[deleteServiceAccount] Network response was not ok! [res]: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}
