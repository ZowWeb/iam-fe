import { useState } from 'react'

import FlexBox from '~/components/FlexBox'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import { getSelectedElement } from '~/components/Vds/Tabs/VdsTabsUtils'
import { AdvancedTablePage } from '~/pages/AdvancedTablePage'
import { ButtonsPage } from '~/pages/ButtonsPage'
import { TabColumn, TableColumn } from './styles'

export const BaseTable = () => {
  const tabsConfig: VdsTabConfig[] = [
    { id: 'teamDetails', label: 'Team Details' },
    { id: 'members', label: 'Members', selected: true },
    { id: 'buttons', label: 'Buttons' },
  ]

  const [selectedTab, setSelectedTab] = useState(getSelectedElement(tabsConfig))
  const handleTabSelect = (tab: VdsTabConfig) => {
    setSelectedTab(tab)
  }

  return (
    <FlexBox gap="1.5rem" customStyle={{ margin: '1.5rem 0' }} alignItems="flex-start">
      <TabColumn>
        <VdsTabs onSelection={handleTabSelect} config={tabsConfig} />
      </TabColumn>
      <TableColumn>
        {selectedTab?.id === 'members' && <AdvancedTablePage />}
        {selectedTab?.id === 'buttons' && <ButtonsPage />}
      </TableColumn>
    </FlexBox>
  )
}
