import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_RowSelectionState as MRTRowSelectionState,
  type MRT_Row as MRTRow,
  type MRT_RowData as MRTRowData,
  type MRT_TableOptions as MRTTableOptions,
} from 'mantine-react-table'
import { Button, Menu } from '@mantine/core'
import { Icon } from '@vds/icons'

import { TableWrapper } from './styles'
import Pagination from '../Vds/Pagination'

type RowActionProps<T extends MRTRowData> =
  | {
      enableRowActions: true
      /**
       * Menu items to be rendered in the row action menu
       * - must be provided if `enableRowActions` is true
       * - use `MenuDropdown` and `MenuItem` from `..AdvancedTable/styles.ts` for consistent styling
       * @example
       * <MenuDropdown>
       *   <MenuItem onClick={handleRowAction1}>Action 1</MenuItem>
       *   <MenuItem onClick={handleRowAction2}>Action 2</MenuItem>
       * </MenuDropdown>
       */
      rowActionMenuItems: (row: MRTRow<T>) => React.ReactNode
    }
  | {
      enableRowActions?: false
      rowActionMenuItems?: never
    }

type ExtraProps<T extends MRTRowData> = RowActionProps<T> & {
  isLoading?: boolean
  rowSelection?: MRTRowSelectionState
  /**
   * Callback function to handle row click events.
   *
   * If not provided, clicking on a row will toggle its selection state (when `enableRowSelection` is true).
   */
  handleRowClick?: (row: MRTRow<T>) => void
}

const Table = <T extends MRTRowData>({
  data,
  columns,
  isLoading = false,
  rowActionMenuItems,
  rowSelection = {},
  handleRowClick,
  ...options
}: MRTTableOptions<T> & ExtraProps<T>) => {
  const table = useMantineReactTable({
    columns,
    data,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '', // Remove actions column header text
      },
    },
    enableColumnFilters: false,
    enablePagination: false,
    rowCount: data.length,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    mantinePaperProps: {
      shadow: '',
      withBorder: false,
      style: {
        '--mrt-row-hover-background-color': 'var(--mrt-base-background-color)',
        '--mrt-selected-row-background-color': 'var(--mrt-base-background-color)',
        '--mrt-selected-row-hover-background-color': 'var(--mrt-base-background-color)',
      },
    },
    state: {
      isLoading,
      rowSelection,
    },
    renderRowActions: ({ row }) => (
      <Menu>
        <Menu.Target>
          <Button variant="transparent" onClick={e => e.stopPropagation()}>
            <Icon name="more-horizontal" size={24} />
          </Button>
        </Menu.Target>
        {rowActionMenuItems && rowActionMenuItems(row)}
      </Menu>
    ),
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: handleRowClick ? () => handleRowClick(row) : row.getToggleSelectedHandler(), // To select a row by clicking anywhere on the row
      style: {
        cursor: handleRowClick || row.getCanSelect() ? 'pointer' : 'default', // Change cursor style if handleRowClick is provided
      },
    }),
    ...options,
  })

  return (
    <TableWrapper>
      <MantineReactTable table={table} />
      <div className="pagination-wrapper">
        <Pagination total={table.getPageCount()} />
      </div>
    </TableWrapper>
  )
}

export default Table
