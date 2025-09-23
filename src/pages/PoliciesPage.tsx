import type { MRT_Row as MRTRow } from 'mantine-react-table'
import { useNavigate } from '@tanstack/react-router'

import { Route } from '~/routes/_authenticated/teams/$teamId/policies'
import ActionToolbar from '~/components/ActionToolbar'
import IamHero from '~/components/IamHero'
import usePolicies from '~/hooks/usePolicies'
import type { Policy } from '~/types/data'
import Table from '~/components/AdvancedTable'
import Block from '~/components/Block'
import { policyColumns } from '~/components/AdvancedTable/shared/columns'

export default function PoliciesPage() {
  const { teamId } = Route.useParams()
  const { isLoading, policies } = usePolicies({ teamId })
  const navigate = useNavigate()

  /**
   * Navigate to details page
   */
  const handleRowClick = (row: MRTRow<Policy>) => {
    navigate({
      to: '/teams/$teamId/policies/$policyId',
      params: { teamId, policyId: row.original.id },
    })
  }

  return (
    <Block>
      <IamHero title="Policies" subtitle="Policies list." />
      <ActionToolbar />
      <Table
        {...{
          data: policies,
          columns: policyColumns,
          isLoading,
          handleRowClick,
        }}
      />
    </Block>
  )
}
