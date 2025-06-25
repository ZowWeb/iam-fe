import { MantineProvider } from '@mantine/core'

import { theme } from '~/styles/theme'
import { BaseTable } from './components/AdvancedTable/BaseTable'
import Layout from './components/Layout'
import MainHeader from './components/Section/Header'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Layout>
        <MainHeader />
        <BaseTable />
      </Layout>
    </MantineProvider>
  )
}

export default App
