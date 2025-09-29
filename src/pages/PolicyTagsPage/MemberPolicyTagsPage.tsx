import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import BasePolicyTagsPage, { type Display } from './BasePolicyTagsPage'
import useMember from '~/hooks/useMember'

export default function MemberPolicyTagsPage() {
  const { teamId, userId } = useParams({ from: '/_authenticated/teams/$teamId/users/$userId/roles/' })
  const { member } = useMember({ userId })

  const display: Display = useMemo(() => {
    return {
      backTo: 'Back to member list',
      displayName: member?.displayName || 'Member name',
      displayEmail: member?.email,
      headerTitle: 'Assign member roles',
    }
  }, [member])

  return <BasePolicyTagsPage teamId={teamId} principalId={userId} display={display} />
}
