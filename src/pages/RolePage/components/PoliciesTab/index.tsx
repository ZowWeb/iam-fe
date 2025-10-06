import { TitleLockup } from '@vds/type-lockups'
import { useParams } from '@tanstack/react-router'

import Table from '~/components/AdvancedTable'
import { policyColumns } from '~/components/AdvancedTable/shared/columns'
import usePoliciesByPolicyTag from '~/hooks/usePoliciesByPolicyTag'
import ActionToolbar from '~/components/ActionToolbar'

export default function PoliciesTab() {
  const { teamId, policyTagId } = useParams({ from: '/_authenticated/teams/$teamId/roles/$policyTagId/' })
  const { isLoading, policies } = usePoliciesByPolicyTag({ teamId, policyTagId })

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
        }}
      />
    </>
  )
}
