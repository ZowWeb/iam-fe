import { createFileRoute } from '@tanstack/react-router'

import PoliciesPage from '~/pages/PoliciesPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/policies/')({
  component: PoliciesPage,
})
