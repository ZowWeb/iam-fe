import { createFileRoute, Outlet } from '@tanstack/react-router'

import { getMember } from '~/queries/getMember'
import getPolicyTagsByPrincipal from '~/queries/getPolicyTagsByPrincipal'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { teamId, userId } }) => {
    const [member, policyTags] = await Promise.all([
      queryClient.ensureQueryData(getMember({ userId })),
      queryClient.ensureQueryData(getPolicyTagsByPrincipal({ teamId, principalId: userId })),
    ])
    return {
      member,
      policyTags,
      crumbTitle: member?.displayName,
    }
  },
})
