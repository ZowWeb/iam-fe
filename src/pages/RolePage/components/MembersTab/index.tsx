import { useParams } from '@tanstack/react-router'
import { TitleLockup } from '@vds/type-lockups'
import { useCallback } from 'react'

import Table from '~/components/AdvancedTable'
import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import usePrincipalsByPolicyTag from '~/hooks/usePrincipalsByPolicyTag'
import { memberColumns } from '~/components/AdvancedTable/shared/columns'
import ActionToolbar from '~/components/ActionToolbar'

const ROW_ACTIONS = {} as const
const handleRowClick = () => {}

export default function MembersTab() {
  const { teamId, policyTagId } = useParams({ from: '/_authenticated/teams/$teamId/roles/$policyTagId/' })
  const { users, isLoading } = usePrincipalsByPolicyTag({ teamId, policyTagId })

  const rowActionMenuItems = useCallback(() => {
    return (
      <MenuDropdown>
        {Object.entries(ROW_ACTIONS).map(([action]) => (
          <MenuItem key={action} onClick={() => {}} />
        ))}
      </MenuDropdown>
    )
  }, [])

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
          enableRowActions: true,
          rowActionMenuItems,
          handleRowClick,
        }}
      />
    </>
  )
}
