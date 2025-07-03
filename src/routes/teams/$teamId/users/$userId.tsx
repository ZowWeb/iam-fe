import { createFileRoute } from '@tanstack/react-router'

import Typography from '~/components/Typography'

function MemberPage() {
  return (
    <div>
      <Typography.H1>Hello World!</Typography.H1>
      <Typography.H3>this is Member Details page!</Typography.H3>
    </div>
  )
}

export const Route = createFileRoute('/teams/$teamId/users/$userId')({
  component: MemberPage,
})
