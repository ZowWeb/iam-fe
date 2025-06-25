import { useState } from 'react'

import classes from '~/App.module.scss'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import { getSelectedElement } from '~/components/Vds/Tabs/VdsTabsUtils'
import { AdvancedTablePage } from '~/pages/AdvancedTablePage'
import { ButtonsPage } from '~/pages/ButtonsPage'

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
    <div className={classes.layoutContainer}>
      <div className={classes.layoutFirstColumn}>
        <VdsTabs onSelection={handleTabSelect} config={tabsConfig} />
      </div>
      <div className={classes.layoutSecondColumn}>
        {selectedTab?.id === 'members' && <AdvancedTablePage />}
        {selectedTab?.id === 'buttons' && <ButtonsPage />}
      </div>
    </div>
  )
}
