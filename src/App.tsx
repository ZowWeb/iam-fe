import { MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { theme } from './theme'
import Table from './components/AdvancedTable'
import Layout from './components/Layout'
import { VdsTabs, type VdsTabConfig } from './components/Vds/Tabs/VdsTabs'
import { getSelectedElement } from './components/Vds/Tabs/VdsTabsUtils'

const tabsConfig: VdsTabConfig[] = [
  { id: 'advanced-table', label: 'Advanced Table', selected: true },
  { id: 'dummy', label: 'Element' },
]

function App() {
  const [selectedTab, setSelectedTab] = useState(getSelectedElement(tabsConfig))
  const handleTabSelect = (tab: VdsTabConfig) => {
    setSelectedTab(tab)
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Layout>
        <VdsTabs onSelection={handleTabSelect} config={tabsConfig} />
        {selectedTab?.id === 'advanced-table' && <Table />}
      </Layout>
    </MantineProvider>
  )
}

export default App
