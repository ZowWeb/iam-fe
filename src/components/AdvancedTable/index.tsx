import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef as MRTColumnDef,
} from 'mantine-react-table'

import Pagination from '../Vds/Pagination'
import { TableWrapper } from './styles'
import type { Person } from '~/mocks/makeData'

export interface TableProps {
  data: Person[]
}

const columns: MRTColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 100,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    enableResizing: false, // disable resizing for this column
    size: 100,
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
    size: 200,
  },
  {
    accessorKey: 'timeInVerzion',
    header: 'Time in Verzion (months)',
    size: 120,
  },
  {
    accessorKey: 'country',
    header: 'Country',
    size: 100,
  },
]

const Table = ({ data }: TableProps) => {
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
