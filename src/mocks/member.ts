import { PrincipalKindEnum, type Member } from '~/types/data'

export const members: Member[] = [
  {
    displayName: 'John Doe',
    id: 'u-12345678910',
    createdAt: new Date().toISOString(),
    email: 'john.doe@email.com',
    kind: PrincipalKindEnum.user,
    idpSource: 'bmo_okta',
    updatedAt: new Date().toISOString(),
  },
]
