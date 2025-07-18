import { createFileRoute } from '@tanstack/react-router'

import MemberPage from '~/pages/MemberPage'

export const Route = createFileRoute('/teams/$teamId/users/$userId/')({
  component: MemberPage,
  loader: async () => {
    const username = await new Promise<string>(resolve => {
      setTimeout(resolve, 100)
      resolve('John Doe')
    })

    return {
      crumbTitle: username,
    }
  },
})
