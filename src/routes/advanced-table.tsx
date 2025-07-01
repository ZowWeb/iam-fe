import { createFileRoute } from '@tanstack/react-router'

import { AdvancedTablePage } from '~/pages/AdvancedTablePage'

export const Route = createFileRoute('/advanced-table')({
  component: AdvancedTablePage,
})
