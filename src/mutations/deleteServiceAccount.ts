import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  serviceAccountId: string
}

const deleteServiceAccount = async ({ teamId, serviceAccountId }: Args) => {
  const response = await apiCloudfrontWithThrow({
    endpoint: `/teams/${teamId}/service-accounts/${serviceAccountId}`,
    method: 'DELETE',
  })

  return response.text()
}

export default deleteServiceAccount
