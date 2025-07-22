import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_RowData as MRTRowData,
  type MRT_TableOptions as MRTTableOptions,
} from 'mantine-react-table'

import { TableWrapper } from './styles'
import Pagination from '../Vds/Pagination'

const Table = <T extends MRTRowData>({
  data,
  columns,
  isLoading = false,
  enableRowActions = false,
  renderRowActionMenuItems,
  ...options
}: MRTTableOptions<T> & { isLoading?: boolean }) => {
  const table = useMantineReactTable({
    columns,
    data,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '', // Remove actions column text
      },
    },
    enableColumnFilters: false,
    enablePagination: false,
    rowCount: data.length,
    enableTopToolbar: false,
    mantinePaperProps: {
      shadow: '',
      withBorder: false,
    },
    state: {
      isLoading,
    },
    enableRowActions,
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

export default Table
