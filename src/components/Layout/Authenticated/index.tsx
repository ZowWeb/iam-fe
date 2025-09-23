import { useNavigate, useRouteContext } from '@tanstack/react-router'

import Grid from '~/components/Grid'
import { LayoutWrapper } from './styles'
import type { LayoutType } from '~/types'
import Breadcrumbs from '~/components/Breadcrumbs'
import Header from '../Header'
import { TEAM_ID, USER_ID } from '~/constants/params'
import Typography from '~/components/Typography'
import type { NavMenuItem } from '../NavMenu'
import NavMenu from '../NavMenu'

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
  const { isAuthenticated } = useRouteContext({ from: '/_authenticated' })
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return <Typography.H2>Please login to continue</Typography.H2>
  }

  const handleSelection = (item: NavMenuItem) => {
    navigate({ to: item.link, params: { teamId: TEAM_ID, userId: USER_ID } })
  }

  return (
    <LayoutWrapper className={`layout--${type}`}>
      <Header />
      <Breadcrumbs />
      <main style={{ marginTop: '2.5rem' }}>
        <Grid>
          <Grid.Col span={3}>
            <NavMenu items={navMenuItems} onClick={handleSelection} />
          </Grid.Col>
          <Grid.Col span={9}>{children}</Grid.Col>
        </Grid>
      </main>
      <footer />
    </LayoutWrapper>
  )
}

export default AuthenticatedLayout
