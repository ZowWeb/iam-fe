import type { Team } from '~/types/data'
import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

type Args = {
  teamId: string
  data: Team
}

/**
 * Update a team's properties including display name and organizational metadata.
 * Requires appropriate permissions to modify team data. Changes are applied immediately.
 */
export default async function updateTeam({ data, teamId }: Args): Promise<Team> {
  const response = await apiCloudfrontWithThrow({
    endpoint: `/teams/${teamId}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
