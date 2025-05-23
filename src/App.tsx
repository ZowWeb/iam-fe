import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import Table from './components/AdvancedTable'
import Layout from './components/Layout'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Layout>
        <Table />
      </Layout>
    </MantineProvider>
  )
}

export default App
