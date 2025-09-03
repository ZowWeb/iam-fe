import { createFileRoute } from '@tanstack/react-router'

import MemberPage from '~/pages/MemberPage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId/')({
  component: MemberPage,
})
