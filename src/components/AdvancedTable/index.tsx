import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_RowData as MRTRowData,
  type MRT_TableOptions as MRTTableOptions,
} from 'mantine-react-table'

import { TableWrapper } from './styles'
import Pagination from '../Vds/Pagination'

export default function Table<T extends MRTRowData>({
  data,
  columns,
  enableRowActions = false,
  renderRowActionMenuItems,
  ...options
}: MRTTableOptions<T>) {
  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '', // Remove actions column text
      },
    },
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    mantinePaperProps: {
      shadow: '',
      withBorder: false,
    },
    renderRowActionMenuItems,
    ...options,
  })

  return (
    <TableWrapper>
      <div className="table-container">
        <MantineReactTable table={table} />
      </div>
      <div className="pagination-wrapper">
        <Pagination total={table.getPageCount()} />
      </div>
    </TableWrapper>
  )
}
