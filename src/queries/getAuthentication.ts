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
        const response = await apiCloudfrontWithThrow({ endpoint: `/whoami` })
        return response.json()
      } catch (error) {
        if (error && typeof error === 'object' && 'status' in error) {
          return { error, status: error.status }
        }
        return { error, status: 500 }
      }
    },
  })
