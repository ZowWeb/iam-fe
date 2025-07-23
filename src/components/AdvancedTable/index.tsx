import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_RowData as MRTRowData,
  type MRT_TableOptions as MRTTableOptions,
} from 'mantine-react-table'
import { Button, Menu } from '@mantine/core'
import { Icon } from '@vds/icons'

import { TableWrapper } from './styles'
import Pagination from '../Vds/Pagination'

type RowActionProps =
  | {
      enableRowActions: true
      /**
       * Menu items to be rendered in the row action menu
       * - must be provided if `enableRowActions` is true
       * - use `MenuDropdown` and `MenuItem` from `..AdvancedTable/styles.ts` for consistent styling
       * @example
       * <MenuDropdown>
       *   <MenuItem>Action 1</MenuItem>
       *   <MenuItem>Action 2</MenuItem>
       * </MenuDropdown>
       */
      rowActionMenuItems: React.ReactNode
    }
  | {
      enableRowActions?: false
      rowActionMenuItems?: never
    }

type ExtraProps = RowActionProps & {
  isLoading?: boolean
}

const Table = <T extends MRTRowData>({
  data,
  columns,
  isLoading = false,
  rowActionMenuItems,
  ...options
}: MRTTableOptions<T> & ExtraProps) => {
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
    },
    state: {
      isLoading,
    },
    renderRowActions: () => (
      <Menu>
        <Menu.Target>
          <Button variant="transparent">
            <Icon name="more-horizontal" size={24} />
          </Button>
        </Menu.Target>
        {rowActionMenuItems}
      </Menu>
    ),
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
