import { useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import type { MRT_RowSelectionState as MRTRowSelectionState } from 'mantine-react-table'
import { Button } from '@vds/buttons'

import IamHero from '~/components/IamHero'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/ActionToolbar'
import Table from '~/components/AdvancedTable'
import { policies as data } from '~/mocks/policiesData'
import Badge from '~/components/Badge'
import { theme } from '~/styles/theme'
import Block from '~/components/Block'
import { policyColumns } from '~/components/AdvancedTable/shared/columns'

const tableOptions = {
  enableRowSelection: true,
  mantineSelectCheckboxProps: { color: theme.black },
  mantineSelectAllCheckboxProps: { color: theme.black },
}

const MemberPoliciesPage = () => {
  const [rowSelection, setRowSelection] = useState<MRTRowSelectionState>({})
  const selectedRowsQty = Object.values(rowSelection).filter(Boolean).length

  return (
    <Block>
      <Link to="..">
        <FlexBox>
          <IconChevronLeft name="arrow-left" size={20} />
          <span>Back to member list</span>
        </FlexBox>
      </Link>
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
      <Table
        {...{
          columns: policyColumns,
          data,
          rowSelection,
          onRowSelectionChange: setRowSelection,
          ...tableOptions,
        }}
      />
    </Block>
  )
}

export default MemberPoliciesPage
