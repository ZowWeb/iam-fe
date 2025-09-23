import { useParams } from '@tanstack/react-router'
import { TitleLockup } from '@vds/type-lockups'
import { useCallback } from 'react'

import { serviceAccountColumns } from '~/components/AdvancedTable/shared/columns'
import usePrincipalsByPolicyTag from '~/hooks/usePrincipalsByPolicyTag'
import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import Table from '~/components/AdvancedTable'
import ActionToolbar from '~/components/ActionToolbar'

const ROW_ACTIONS = {} as const
const handleRowClick = () => {}

export default function ServiceAccountsTab() {
  const { teamId, policyTagId } = useParams({ from: '/_authenticated/teams/$teamId/roles/$policyTagId/' })
  const { isLoading, serviceAccounts } = usePrincipalsByPolicyTag({ teamId, policyTagId })

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
            children: 'Service accounts and roles',
          },
          subtitle: {
            primitive: 'p',
            size: 'bodyLarge',
            children:
              'Service accounts assigned this role have specific permissions to perform actions and access resources. Service accounts can be associate with multiple roles.',
          },
        }}
      />
      <ActionToolbar ctaConfig={{ label: 'Assign to service accounts', onClick: () => {} }} />
      <Table
        {...{
          data: serviceAccounts,
          columns: serviceAccountColumns,
          isLoading,
          enableRowActions: true,
          rowActionMenuItems,
          handleRowClick,
        }}
      />
    </>
  )
}
