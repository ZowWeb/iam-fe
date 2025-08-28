export type Person = {
  firstName: string
  lastName: string
  email: string
  timeInVerzion: number
  country: string
}

export const PrincipalKind = {
  user: 'user',
  service_account: 'service_account',
} as const

export type PrincipalKind = (typeof PrincipalKind)[keyof typeof PrincipalKind]

export const UserIdpSource = {
  bmo_okta: 'bmo_okta',
  vz_internal_forgerock: 'vz_internal_forgerock',
  vz_external_forgerock: 'vz_external_forgerock',
} as const

export type IdpSource = (typeof UserIdpSource)[keyof typeof UserIdpSource]

export type Member = {
  id: `u-${string}`
  displayName: string
  kind: (typeof PrincipalKind)['user']
  email: string
  idpSource: IdpSource
  createdAt: string
  updatedAt?: string
}

export type Policy = {
  name: string
  description: string
  lastUpdated: string
  applied: string
}

export type Team = {
  id: `team-${string}`
  displayName: string
  parentTeamId: `team-${string}`
  appOwnerTeamId: `team-${string}`
  kind: string
  isRootTeam: boolean
  isPlatformTeam: boolean
  createdAt: string
  updatedAt: string
  tags: []
  disabledAt: string
}

export type ServiceAccount = {
  id: string
  teamId: `team-${string}`
  createdAt: string
  updatedAt: string
  displayName: string
  kind: (typeof PrincipalKind)['service_account']
}

export type PolicyTag = {
  policyTagId: string
  policyTagName: string
}
