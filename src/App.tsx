import { MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { theme } from './theme'
import Layout from './components/Layout'
import { VdsTabs, type VdsTabConfig } from './components/Vds/Tabs/VdsTabs'
import { getSelectedElement } from './components/Vds/Tabs/VdsTabsUtils'
import classes from './App.module.scss'
import { AdvancedTablePage } from './pages/AdvancedTablePage'
import { ButtonsPage } from './pages/ButtonsPage'

const tabsConfig: VdsTabConfig[] = [
  { id: 'advanced-table', label: 'Advanced Table', selected: true },
  { id: 'buttons', label: 'Buttons' },
]

function App() {
  const [selectedTab, setSelectedTab] = useState(getSelectedElement(tabsConfig))
  const handleTabSelect = (tab: VdsTabConfig) => {
    setSelectedTab(tab)
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Layout>
        <div className={classes.layoutContainer}>
          <div className={classes.layoutFirstColumn}>
            <VdsTabs onSelection={handleTabSelect} config={tabsConfig} />
          </div>

          <div className={classes.layoutSecondColumn}>
            {selectedTab?.id === 'advanced-table' && <AdvancedTablePage />}
            {selectedTab?.id === 'buttons' && <ButtonsPage />}
          </div>
        </div>
      </Layout>
    </MantineProvider>
  )
}

export default App
