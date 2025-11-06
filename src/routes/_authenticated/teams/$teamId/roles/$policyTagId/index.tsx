import { createFileRoute } from '@tanstack/react-router'

import RolePage from '~/pages/RolePage'

export const Route = createFileRoute('/_authenticated/teams/$teamId/roles/$policyTagId/')({
  component: RolePage,
  loader: async ({ params: { policyTagId } }) => {
    return {
      crumbTitle: policyTagId,
    }
  },
})
