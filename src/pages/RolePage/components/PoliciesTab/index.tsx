import { TitleLockup } from '@vds/type-lockups'
import { useCallback } from 'react'
import { useParams } from '@tanstack/react-router'

import { MenuDropdown, MenuItem } from '~/components/AdvancedTable/styles'
import Table from '~/components/AdvancedTable'
import { policyColumns } from '~/components/AdvancedTable/shared/columns'
import usePoliciesByPolicyTag from '~/hooks/usePoliciesByPolicyTag'
import ActionToolbar from '~/components/ActionToolbar'

const ROW_ACTIONS = {} as const
const handleRowClick = () => {}

export default function PoliciesTab() {
  const { teamId, policyTagId } = useParams({ from: '/_authenticated/teams/$teamId/roles/$policyTagId/' })
  const { isLoading, policies } = usePoliciesByPolicyTag({ teamId, policyTagId })
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
            children: 'Applied policies',
          },
          subtitle: {
            primitive: 'p',
            size: 'bodyLarge',
            children:
              'Policies define the specific permissions this member has to perform actions and access resources.',
          },
        }}
      />
      <ActionToolbar ctaConfig={{ label: 'Manage policies', onClick: () => {} }} />
      <Table
        {...{
          data: policies,
          columns: policyColumns,
          isLoading,
          enableRowActions: true,
          rowActionMenuItems,
          handleRowClick,
        }}
      />
    </>
  )
}
