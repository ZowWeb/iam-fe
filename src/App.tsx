import { MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { theme } from './theme'
import Table from './components/AdvancedTable'
import Layout from './components/Layout'
import { VdsTabs, type VdsTabConfig } from './components/Vds/Tabs/VdsTabs'
import { getSelectedElement } from './components/Vds/Tabs/VdsTabsUtils'
import { Buttons } from './components/Vds/Buttons/Buttons'

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
        <div className="flex-row">
          <div className="flex-col flex-wrap">
            <VdsTabs onSelection={handleTabSelect} config={tabsConfig} />
          </div>

          <div className="flex-col flex-wrap">
            {selectedTab?.id === 'advanced-table' && <Table />}
            {selectedTab?.id === 'buttons' && <Buttons />}
          </div>
        </div>
      </Layout>
    </MantineProvider>
  )
}

export default App
