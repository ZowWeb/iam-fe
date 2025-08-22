import { useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import type {
  MRT_ColumnDef as MRTColumnDef,
  MRT_RowSelectionState as MRTRowSelectionState,
} from 'mantine-react-table'
import { Button } from '@vds/buttons'

import IamHero from '~/components/IamHero'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/ActionToolbar'
import Table from '~/components/AdvancedTable'
import type { Policy } from '~/types/data'
import { policies as data } from '~/mocks/policiesData'
import Badge from '~/components/Badge'
import { theme } from '~/styles/theme'

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
    accessorKey: 'lastUpdated',
    header: 'Last updated',
    size: 100,
  },
]

const tableOptions = {
  enableRowSelection: true,
  mantineSelectCheckboxProps: { color: theme.black },
  mantineSelectAllCheckboxProps: { color: theme.black },
}

const MemberPoliciesPage = () => {
  const [rowSelection, setRowSelection] = useState<MRTRowSelectionState>({})
  const selectedRowsQty = Object.values(rowSelection).filter(Boolean).length

  return (
    <>
      <Link to="..">
        <FlexBox customStyle={{ marginBottom: '2rem' }}>
          <IconChevronLeft name="arrow-left" size={20} />
          <span>Back to member list</span>
        </FlexBox>
      </Link>
      <FlexBox direction="column" gap="2.5rem">
        <TitleLockup
          data={{
            title: {
              size: 'titleLarge',
              bold: false,
              children: 'Assign a member policy',
              color: COLORS.brandHighlight,
            },
            subtitle: {
              size: 'bodyLarge',
              children: 'Add or remove a policy from the list bellow. Click save to commit the change.',
            },
          }}
        />
        <IamHero title="John Smith" showActionButton={false} gap="0">
          <FlexBox alignItems="flex-end">
            <FlexBox direction="column" alignItems="flex-start" gap="1rem">
              <div>john.smith@email.com</div>
              <FlexBox alignItems="flex-end">
                <FlexBox gap="0.5rem">
                  {selectedRowsQty > 0 && (
                    <Badge
                      text={`${selectedRowsQty} ${selectedRowsQty === 1 ? 'Policy' : 'Policies'} assigned`}
                      color="blue"
                    />
                  )}
                  <Badge text="0 Policies removed" color="yellow" />
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <FlexBox justifyContent="end" alignItems="flex-end" gap="1rem">
              <Button size="small">Save</Button>
              <Button size="small" use="secondary">
                Cancel
              </Button>
            </FlexBox>
          </FlexBox>
        </IamHero>
        <ActionToolbar />
        <Table {...{ columns, data, rowSelection, onRowSelectionChange: setRowSelection, ...tableOptions }} />
      </FlexBox>
    </>
  )
}

export default MemberPoliciesPage
