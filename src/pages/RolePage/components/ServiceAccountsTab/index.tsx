import { useNavigate, useParams } from '@tanstack/react-router'
import { TitleLockup } from '@vds/type-lockups'

import { serviceAccountColumns } from '~/components/AdvancedTable/shared/columns'
import usePrincipalsByPolicyTag from '~/hooks/usePrincipalsByPolicyTag'
import Table from '~/components/AdvancedTable'
import ActionToolbar from '~/components/ActionToolbar'

export default function ServiceAccountsTab() {
  const { teamId, policyTagId } = useParams({ from: '/_authenticated/teams/$teamId/roles/$policyTagId/' })
  const { isLoading, serviceAccounts } = usePrincipalsByPolicyTag({ teamId, policyTagId })
  const navigate = useNavigate()

  const handleActionButtonClick = () => {
    navigate({
      to: '/teams/$teamId/roles/$policyTagId/service-accounts',
      params: { teamId, policyTagId },
    })
  }

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
      <ActionToolbar ctaConfig={{ label: 'Assign to service accounts', onClick: handleActionButtonClick }} />
      <Table
        {...{
          data: serviceAccounts,
          columns: serviceAccountColumns,
          isLoading,
        }}
      />
    </>
  )
}
