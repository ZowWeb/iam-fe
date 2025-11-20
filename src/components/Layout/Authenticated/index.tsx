import { useNavigate, useLocation } from '@tanstack/react-router'

import Grid from '~/components/Grid'
import { LayoutWrapper, Main } from './styles'
import type { LayoutType } from '~/types'
import Breadcrumbs from '~/components/Breadcrumbs'
import Header from '../Header'
import Typography from '~/components/Typography'
import type { NavMenuItem } from '../NavMenu'
import NavMenu from '../NavMenu'
import useAuthentication from '~/hooks/useAuthentication'

const navMenuItems: NavMenuItem[] = [
  { id: 'teamPage', label: 'Team Details', link: '/teams/$teamId' },
  { id: 'membersPage', label: 'Members', link: '/teams/$teamId/users' },
  { id: 'serviceAccountsPage', label: 'Service Accounts', link: '/teams/$teamId/service-accounts' },
  { id: 'rolesPage', label: 'Roles', link: '/teams/$teamId/roles' },
  { id: 'policiesPage', label: 'Policies', link: '/teams/$teamId/policies' },
]

type Props = {
  children?: React.ReactNode
  type?: LayoutType
}

const AuthenticatedLayout = ({ children, type = 'standard' }: Props) => {
  const { data: authData } = useAuthentication()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const hideNavTab = pathname.endsWith('/profile')

  if (!authData) {
    return <Typography.H2>Please login to continue</Typography.H2>
  }

  const handleSelection = (item: NavMenuItem) => {
    navigate({
      to: item.link,
      params: { teamId: authData.team.id, userId: authData.principal.id },
    })
  }

  return (
    <LayoutWrapper className={`layout--${type}`}>
      <Header />
      <Breadcrumbs />
      <Main>
        {hideNavTab ? (
          children
        ) : (
          <Grid type="container">
            <Grid.Col span={{ base: 12, sm: 3 }}>
              <NavMenu items={navMenuItems} onClick={handleSelection} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 9 }}>{children}</Grid.Col>
          </Grid>
        )}
      </Main>
      <footer />
    </LayoutWrapper>
  )
}

export default AuthenticatedLayout
