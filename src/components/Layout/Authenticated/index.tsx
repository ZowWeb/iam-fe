import { useNavigate, useRouteContext } from '@tanstack/react-router'

import Block from '~/components/Block'
import Grid from '~/components/Grid'
import { LayoutWrapper } from './styles'
import type { LayoutType } from '~/types'
import Breadcrumbs from '~/components/Breadcrumbs'
import Header from '../Header'
import { VdsTabs, type TabConfig } from '~/components/Vds/Tabs'
import { TEAM_ID, USER_ID } from '~/constants/params'
import Typography from '~/components/Typography'

const tabsConfig: TabConfig[] = [
  { id: 'teamPage', label: 'Team Details', link: '/teams/$teamId' },
  { id: 'membersPage', label: 'Members', link: '/teams/$teamId/users' },
  { id: 'rolesPage', label: 'Roles', link: '/teams/$teamId/roles' },
  { id: 'policiesPage', label: 'Policies', link: '/teams/$teamId/users/$userId/policies' },
  { id: 'serviceAccountsPage', label: 'Service Accounts', link: '/teams/$teamId/service-accounts' },
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

  const handleTabSelection = (tab: TabConfig) => {
    navigate({ to: tab.link, params: { teamId: TEAM_ID, userId: USER_ID } })
  }

  return (
    <LayoutWrapper className={`layout--${type}`}>
      <Header />
      <Breadcrumbs />
      <main>
        <Block>
          <Grid>
            <Grid.Col span={3}>
              <VdsTabs onClick={handleTabSelection} tabs={tabsConfig} />
            </Grid.Col>
            <Grid.Col span={9}>{children}</Grid.Col>
          </Grid>
        </Block>
      </main>
      <footer />
    </LayoutWrapper>
  )
}

export default AuthenticatedLayout
