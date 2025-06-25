import { MantineProvider } from '@mantine/core'

import { theme } from '~/styles/theme'
import { BaseTable } from './components/AdvancedTable/BaseTable'
import Layout from './components/Layout'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Layout>
        <BaseTable />
      </Layout>
    </MantineProvider>
  )
}

export default App
