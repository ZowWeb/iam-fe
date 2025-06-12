import { useState } from 'react'
import { Grid } from '@mantine/core'
import { AdvancedTablePage } from '@/pages/AdvancedTablePage'
import { ButtonsPage } from '@/pages/ButtonsPage'
import { VdsTabs, type VdsTabConfig } from '@/components/Vds/Tabs/VdsTabs'
import classes from '@/App.module.scss'
import { getSelectedElement } from '@/components/Vds/Tabs/VdsTabsUtils'

export const BaseTable = () => {
  const tabsConfig: VdsTabConfig[] = [
    { id: 'advanced-table', label: 'Advanced Table', selected: true },
    { id: 'buttons', label: 'Buttons' },
  ]

  const [selectedTab, setSelectedTab] = useState(getSelectedElement(tabsConfig))
  const handleTabSelect = (tab: VdsTabConfig) => {
    setSelectedTab(tab)
  }

  return (
    <Grid className="main__table-grid">
      <div className={classes.layoutContainer}>
        <div className={classes.layoutFirstColumn}>
          <VdsTabs onSelection={handleTabSelect} config={tabsConfig} />
        </div>

        <div className={classes.layoutSecondColumn}>
          {selectedTab?.id === 'advanced-table' && <AdvancedTablePage />}
          {selectedTab?.id === 'buttons' && <ButtonsPage />}
        </div>
      </div>
    </Grid>
  )
}
