import type { MRT_Row as MRTRow, MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { useNavigate } from '@tanstack/react-router'

import { Route } from '~/routes/_authenticated/teams/$teamId/policies'
import ActionToolbar from '~/components/ActionToolbar'
import IamHero from '~/components/IamHero'
import usePolicies from '~/hooks/usePolicies'
import type { Policy } from '~/types/data'
import { getFormattedDate } from '~/utils/dates'
import Table from '~/components/AdvancedTable'
import Block from '~/components/Block'

const columns: MRTColumnDef<Policy>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 100,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 100,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last updated',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
]

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
          columns,
          isLoading,
          handleRowClick,
        }}
      />
    </Block>
  )
}
