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
  const getCursorStyle = (row: MRTRow<T>) => {
    // No data cursor
    if (data.length === 0) return 'text'
    // Cursor for selectable rows
    if (row.getCanSelect()) return 'cell'
    // Cursor for rows with click handler
    if (handleRowClick) return 'pointer'
    // Default cursor otherwise
    return 'default'
  }

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnFilters: false,
    enablePagination: false,
    rowCount: data.length,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableSorting: false,
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
    enableColumnActions: false,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '', // Remove actions column header text
        mantineTableBodyCellProps: {
          className: 'row-action',
        },
      },
    },
    renderRowActions: ({ row }) =>
      rowActionMenuItems && (
        <Menu>
          <Menu.Target>
            <Button variant="transparent" onClick={e => e.stopPropagation()}>
              <Icon name="more-horizontal" size={24} />
            </Button>
          </Menu.Target>
          {rowActionMenuItems(row)}
        </Menu>
      ),
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        // prevent row click when there's no data
        if (data.length === 0) return
        if (handleRowClick) {
          return handleRowClick(row)
        }
        if (row.getCanSelect()) {
          row.toggleSelected()
        }
        return undefined
      },
      style: {
        cursor: getCursorStyle(row),
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
