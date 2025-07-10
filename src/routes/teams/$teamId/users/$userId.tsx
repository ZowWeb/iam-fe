import { createFileRoute } from '@tanstack/react-router'

import MemberPage from '~/pages/MemberPage'

export const Route = createFileRoute('/teams/$teamId/users/$userId')({
  component: MemberPage,
})
