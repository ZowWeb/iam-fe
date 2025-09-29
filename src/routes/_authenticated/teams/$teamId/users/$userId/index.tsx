import { createFileRoute } from '@tanstack/react-router'

import MemberPage from '~/pages/MemberPage'
import { getMember } from '~/queries/getMember'
import getPolicyTagsByPrincipal from '~/queries/getPolicyTagsByPrincipal'

export const Route = createFileRoute('/_authenticated/teams/$teamId/users/$userId/')({
  component: MemberPage,
  loader: async ({ context: { queryClient }, params: { teamId, userId } }) => {
    const [serviceAccount, policyTags] = await Promise.all([
      queryClient.ensureQueryData(getMember({ userId })),
      queryClient.ensureQueryData(getPolicyTagsByPrincipal({ teamId, principalId: userId })),
    ])

    return {
      serviceAccount,
      policyTags,
      crumbTitle: serviceAccount?.displayName,
    }
  },
})
