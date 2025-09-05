import { createFileRoute } from '@tanstack/react-router'

import ServiceAccountPage from '~/pages/ServiceAccountPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/')({
  component: ServiceAccountPage,
})
