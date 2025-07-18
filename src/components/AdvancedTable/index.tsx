import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_TableOptions as MRTTableOptions,
  type MRT_ColumnDef as MRTColumnDef,
} from 'mantine-react-table'

import Pagination from '../Vds/Pagination'
import { TableWrapper } from './styles'

export interface TableProps<T extends object> {
  columns: MRTColumnDef<T>[]
  data: T[]
  options?: MRTTableOptions<T>
}

const Table = <T extends object>({ columns, data, options }: TableProps<T>) => {
  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    mantinePaperProps: {
      shadow: '',
      withBorder: false,
    },
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
