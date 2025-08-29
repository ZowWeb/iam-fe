export type Person = {
  firstName: string
  lastName: string
  email: string
  timeInVerzion: number
  country: string
}

export enum PrincipalKindEnum {
  user = 'user',
  service_account = 'service_account',
}

export type PrincipalKind = `${PrincipalKindEnum}`

export enum UserIdpSourceEnum {
  bmo_okta = 'bmo_okta',
  vz_internal_forgerock = 'vz_internal_forgerock',
  vz_external_forgerock = 'vz_external_forgerock',
}

export type IdpSource = `${UserIdpSourceEnum}`

export type Member = {
  id: `u-${string}`
  displayName: string
  kind: PrincipalKindEnum.user
  email: string
  idpSource: IdpSource
  createdAt: string
  updatedAt?: string
}

export type Policy = {
  id: `p-${string}`
  name: string
  description: string
  lastUpdated: string
  applied: string
}

export type Team = {
  id: `team-${string}`
  displayName: string
  parentTeamId: `team-${string}`
  appOwnerTeamId: string
  kind: string
  isRootTeam: boolean
  isPlatformTeam: boolean
  createdAt: string
  updatedAt: string
  tags: []
  disabledAt: string
}

export type ServiceAccount = {
  id: `s-${string}`
  teamId: `team-${string}`
  createdAt: string
  updatedAt: string
  displayName: string
  kind: PrincipalKindEnum.service_account
}

export type PolicyTag = {
  policyTagId: `pt-${string}`
  policyTagName: string
}
