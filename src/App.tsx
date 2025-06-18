import { Container, MantineProvider } from '@mantine/core'

import { theme } from '~/styles/theme'
import { BaseTable } from './components/AdvancedTable/BaseTable'
import Layout from './components/Layout'
import MainHeader from './components/Section/Header'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Layout>
        <Container className="main" size="100%">
          <MainHeader />
          <BaseTable />
        </Container>
      </Layout>
    </MantineProvider>
  )
}

export default App
