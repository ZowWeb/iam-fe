import { createFileRoute } from '@tanstack/react-router'

import ServiceAccountsPage from '~/pages/ServiceAccountsPage'

export const Route = createFileRoute('/teams/$teamId/service-accounts/')({
  component: ServiceAccountsPage,
})
