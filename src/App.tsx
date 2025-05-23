import './App.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import Table from './components/Table'
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
