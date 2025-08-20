import { createFileRoute } from '@tanstack/react-router'

import TeamOverviewPage from '~/pages/TeamOverviewPage'

export const Route = createFileRoute('/teams/$teamId/')({
  component: TeamOverviewPage,
})
