import { useParams } from '@tanstack/react-router'
import { TitleLockup } from '@vds/type-lockups'

import Table from '~/components/AdvancedTable'
import usePrincipalsByPolicyTag from '~/hooks/usePrincipalsByPolicyTag'
import { memberColumns } from '~/components/AdvancedTable/shared/columns'
import ActionToolbar from '~/components/ActionToolbar'

export default function MembersTab() {
  const { teamId, policyTagId } = useParams({ from: '/_authenticated/teams/$teamId/roles/$policyTagId/' })
  const { users, isLoading } = usePrincipalsByPolicyTag({ teamId, policyTagId })

  return (
    <>
      <TitleLockup
        data={{
          title: {
            primitive: 'h4',
            size: 'titleMedium',
            children: 'Members and roles',
          },
          subtitle: {
            primitive: 'p',
            size: 'bodyLarge',
            children:
              'Members assigned this role have specific permissions to perform actions and access resources. Members can be associate with multiple roles.',
          },
        }}
      />
      <ActionToolbar ctaConfig={{ label: 'Assign to members', onClick: () => {} }} />
      <Table
        {...{
          data: users,
          columns: memberColumns,
          isLoading,
        }}
      />
    </>
  )
}
