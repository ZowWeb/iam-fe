import type { InviteMember } from '~/types/data'

type InviteMembersProp = {
  teamId: string
  data: InviteMember
}

/**
 * Add an existing user to a team
 * @returns "ok"
 */
export default async function inviteMembers({ data, teamId }: InviteMembersProp): Promise<string> {
  const response = await fetch(`https://iamservice.dev.api.aws.tpd-soe.net/teams/${teamId}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to invite members')
  }

  return response.text() // Endpoint return "ok"
}
