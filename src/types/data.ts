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

export type User = Member

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
  tags: []
  createdAt: string
  updatedAt?: string
  disabledAt?: string
}

export type ServiceAccount = {
  id: `s-${string}`
  teamId: `team-${string}`
  displayName: string
  kind: PrincipalKindEnum.service_account
  createdAt: string
  updatedAt?: string
}

export type PolicyTag = {
  id: `pt-${string}`
  policyTagName: string
}

export type InviteMember = {
  email: string
}

export type ServerErrorSchema = {
  error_uri?: string
  error:
    | 'invalid_request'
    | 'invalid_client'
    | 'invalid_grant'
    | 'unauthorized_client'
    | 'unsupported_grant_type'
    | 'invalid_scope'
    | 'not_found'
    | 'conflict'
    | 'forbidden'
    | 'internal_server_error'
    | 'service_unavailable'
    | 'vzrn_parse_error'
    | 'vziam_statement_error'
    | 'authorization_pending'
    | 'unsupported_kind'
  error_description: string
}
