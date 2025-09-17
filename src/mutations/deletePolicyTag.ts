import apiServerWithThrow from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  policyTagId: string
}

const deletePolicyTag = async ({ teamId, policyTagId }: Args): Promise<boolean> => {
  const response = await apiServerWithThrow({
    endpoint: `/teams/${teamId}/policy-tags/${policyTagId}`,
    method: 'DELETE',
  })

  return response.ok
}

export default deletePolicyTag
