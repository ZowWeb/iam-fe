import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_RowData as MRTRowData,
  type MRT_ColumnDef as MRTColumnDef,
} from 'mantine-react-table'

import Pagination from '../Vds/Pagination'
import { TableWrapper } from './styles'

export interface TableProps<T extends MRTRowData> {
  data: T[]
  columns: MRTColumnDef<T>[]
}

export default function Table<T extends MRTRowData>({ data, columns }: TableProps<T>) {
  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableRowActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    mantinePaperProps: {
      shadow: '',
      withBorder: false,
    },
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
