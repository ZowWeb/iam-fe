import { useNavigate, useRouteContext, useMatches } from '@tanstack/react-router'

import Grid from '~/components/Grid'
import { LayoutWrapper, Main } from './styles'
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
  const matches = useMatches()
  let showNavMenu = true

  matches.reverse().forEach(({ loaderData }) => {
    if (loaderData && 'showNavMenu' in loaderData) {
      showNavMenu = loaderData.showNavMenu
    }
  })

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
      <Main>
        <Grid type="container">
          {showNavMenu ? (
            <>
              <Grid.Col span={{ base: 12, sm: 3 }}>
                <NavMenu items={navMenuItems} onClick={handleSelection} />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 9 }}>{children}</Grid.Col>
            </>
          ) : (
            <Grid.Col span={{ base: 12, sm: 12 }}>{children}</Grid.Col>
          )}
        </Grid>
      </Main>
      <footer />
    </LayoutWrapper>
  )
}

export default AuthenticatedLayout
