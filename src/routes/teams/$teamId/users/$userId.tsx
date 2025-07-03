import { createFileRoute } from '@tanstack/react-router'

function MemberPage() {
  return <div>Hello, this is Member Details page!</div>
}

export const Route = createFileRoute('/teams/$teamId/users/$userId')({
  component: MemberPage,
})
