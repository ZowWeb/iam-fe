import FlexBox from '~/components/FlexBox'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import { AdvancedTablePage } from '~/pages/AdvancedTablePage'
import { TabColumn, TableColumn } from './styles'

export const BaseTable = () => {
  const tabsConfig: VdsTabConfig[] = [
    { id: 'teamDetails', label: 'Team Details' },
    { id: 'members', label: 'Members', selected: true },
    { id: 'policies', label: 'Policies' },
    { id: 'serviceAccounts', label: 'Service accounts' },
  ]

  return (
    <FlexBox gap="1.5rem" customStyle={{ margin: '2.5rem 0' }} alignItems="flex-start">
      <TabColumn>
        <VdsTabs onSelection={() => {}} config={tabsConfig} />
      </TabColumn>
      <TableColumn>
        <AdvancedTablePage />
      </TableColumn>
    </FlexBox>
  )
}
