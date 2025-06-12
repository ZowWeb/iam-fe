import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import ActionToolbar from './ActionToolbar'
import classes from './AdvancedTable.module.scss'
import Pagination from '../Vds/Pagination'

export interface TableProps {
  enableRowSelection: boolean
  enableSorting: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any
}

const Table = ({ enableRowSelection = false, enableSorting = false, data, columns }: TableProps) => {
  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableSorting,
    enableRowSelection,
    mantinePaperProps: {
      shadow: '',
      withBorder: false,
    },
  })

  const handleAction = () => {}

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <ActionToolbar onAction={handleAction} actionButtonText="Action Button" />
      </div>
      <div className={classes.tableWrapper}>
        <MantineReactTable table={table} />
      </div>
      <div className={classes.pagination}>
        <Pagination />
      </div>
    </div>
  )
}

export default Table
