import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  userId: string
}

export default async function removeMember({ teamId, userId }: Args): Promise<boolean> {
  const response = await apiCloudfrontWithThrow({
    endpoint: `/teams/${teamId}/users/${userId}`,
    method: 'DELETE',
  })

  return response.ok
}
