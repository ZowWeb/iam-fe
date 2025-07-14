import { styled } from '@linaria/react'
import { ActionIcon, Menu } from '@mantine/core'
import { type MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import MoreHorizontal from '@vds/icons/more-horizontal'

import Table from '~/components/AdvancedTable'
import type { Person } from '~/mocks/makeData'

const StyledMenuDropdown = styled(Menu.Dropdown)`
  min-width: 11.75rem;
`

const StyledMenuItem = styled(Menu.Item)`
  padding: 0.7rem 1.25rem;
  font-size: 1rem;
`

const StyledActionButton = styled(ActionIcon)`
  background-color: white;
  &:hover {
    background-color: white;
  }
`

const ActionColumn = () => (
  <Menu>
    <Menu.Target>
      <StyledActionButton>
        <MoreHorizontal size="medium" />
      </StyledActionButton>
    </Menu.Target>
    <StyledMenuDropdown>
      <StyledMenuItem>Resend invite</StyledMenuItem>
      <StyledMenuItem>Cancel invite</StyledMenuItem>
    </StyledMenuDropdown>
  </Menu>
)

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
  {
    accessorKey: 'actions',
    header: '',
    enableSorting: false,
    size: 10,
    Cell: () => <ActionColumn />,
  },
]

type MembersTableProps = {
  data: Person[]
}

export default function MembersTable({ data }: MembersTableProps) {
  return <Table<Person> data={data} columns={columns} />
}
