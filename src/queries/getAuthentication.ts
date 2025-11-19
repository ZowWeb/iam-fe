import { queryOptions } from '@tanstack/react-query'

import { apiCloudfrontWithThrow } from '~/utils/apiServerWithThrow'

export type AuthenticationData = {
  team: {
    appOwnerTeamId: string
    createdAt: string
    displayName: string
    id: string
    isPlatformTeam: boolean
    isRootTeam: boolean
    kind: string
    parentTeamId: string | null
    tags: string[]
  }
  principal: {
    createdAt: string
    displayName: string
    email: string
    id: string
    kind: string
    idpSource: 'bmo_okta' | 'internal'
  }
  userName: string
}

export const getAuthentication = () =>
  queryOptions<AuthenticationData>({
    queryKey: ['WHOAMI'],
    queryFn: async () => {
      try {
        const response = await apiCloudfrontWithThrow({ endpoint: `/api/proxy/oauth2/v3/whoami` })
        return response.json()
      } catch (e) {
        if (e && typeof e === 'object' && 'status' in e) {
          return { error: true, status: e.status }
        }
        return { error: true, status: 500 }
      }
    },
  })
