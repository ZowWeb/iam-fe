import type { MRT_Row as MRTRow } from 'mantine-react-table'
import { useNavigate, useParams } from '@tanstack/react-router'

import ActionToolbar from '~/components/ActionToolbar'
import Hero from '~/components/Hero'
import usePolicies from '~/hooks/usePolicies'
import type { Policy } from '~/types/data'
import Table from '~/components/AdvancedTable'
import Block from '~/components/Block'
import { policyColumns } from '~/components/AdvancedTable/shared/columns'

export default function PoliciesPage() {
  const { teamId } = useParams({ from: '/_authenticated/teams/$teamId/policies/' })
  const { isLoading, policies } = usePolicies({ teamId })
  const navigate = useNavigate()

  /**
   * Navigate to details page
   */
  const handleRowClick = (row: MRTRow<Policy>) => {
    const { id } = row.original

    if (!id) return

    navigate({
      to: '/teams/$teamId/policies/$policyId',
      params: { teamId, policyId: id },
    })
  }

  return (
    <Block>
      <Hero title="Policies" subtitle="Policies list." />
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
