import './App.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import Table from './components/Table'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Table />
    </MantineProvider>
  )
}

export default App
