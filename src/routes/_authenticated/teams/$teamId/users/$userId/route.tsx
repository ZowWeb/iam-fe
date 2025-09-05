import { createFileRoute, Outlet } from '@tanstack/react-router'

import { getMember } from '~/queries/getMember'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { userId } }) => {
    const [member] = await Promise.all([
      queryClient.ensureQueryData(getMember({ userId })),
      /**
     * Uncomment when APIFIAM-606 is ready
      queryClient.ensureQueryData(getPolicyTagsByPrincipal({ teamId, principalId: userId })),
     */
    ])
    return {
      member,
      policyTags: [],
      crumbTitle: member?.displayName,
    }
  },
})
